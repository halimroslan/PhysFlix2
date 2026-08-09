"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { allVideoLessons } from "@/data/physicsData";
import { Users, Eye, Clock, Activity, Loader2 } from "lucide-react";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  lastLogin: any;
}

interface VideoStat {
  id: string;
  views: number;
}

export const AnalyticBoard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<VideoStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Users
        const usersSnap = await getDocs(collection(db, "users"));
        const usersData = usersSnap.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as UserData[];
        
        // Fetch Video Stats
        const statsSnap = await getDocs(collection(db, "videoStats"));
        const statsData = statsSnap.docs.map(doc => ({
          id: doc.id,
          views: doc.data().views || 0
        })) as VideoStat[];

        setUsers(usersData.sort((a, b) => b.lastLogin?.seconds - a.lastLogin?.seconds));
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 space-x-3 text-sky-400">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="font-bold">Memuatkan data Analitik...</span>
      </div>
    );
  }

  // Calculate totals
  const totalUsers = users.length;
  const totalViews = stats.reduce((acc, curr) => acc + curr.views, 0);

  // Prepare chart data for videos
  const chartData = stats.map(s => {
    const lesson = allVideoLessons.find(l => l.id === s.id);
    return {
      name: lesson ? `B${lesson.chapterNum} M${lesson.week.replace("Minggu ", "")}` : s.id,
      views: s.views,
      fullTitle: lesson?.titleBm || s.id
    };
  }).sort((a, b) => b.views - a.views).slice(0, 10); // Top 10 videos

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <Activity className="w-8 h-8 text-sky-400" />
        <h2 className="text-3xl font-extrabold text-white">Developer Analytic Board</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-semibold">Jumlah Pelajar</p>
            <p className="text-3xl font-bold text-white">{totalUsers}</p>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center space-x-4">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <Eye className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-semibold">Jumlah Tontonan (Views)</p>
            <p className="text-3xl font-bold text-white">{totalViews}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-3">Top 10 Video Paling Banyak Ditonton</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickMargin={10} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                cursor={{ fill: '#1e293b' }}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Tontonan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Senarai Pelajar Berdaftar</h3>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-xs font-bold rounded-full">{users.length} Akaun</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-300 text-sm">
                <th className="p-4 font-semibold">Nama / Emel</th>
                <th className="p-4 font-semibold">ID Firebase</th>
                <th className="p-4 font-semibold text-right">Log Masuk Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((u, i) => {
                const date = u.lastLogin?.seconds 
                  ? new Date(u.lastLogin.seconds * 1000).toLocaleString('ms-MY') 
                  : 'Tiada Rekod';
                
                return (
                  <tr key={i} className="hover:bg-slate-800/30 transition text-sm">
                    <td className="p-4 text-white">
                      <div className="font-semibold">{u.displayName}</div>
                      <div className="text-slate-500 text-xs">{u.email}</div>
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-xs">{u.uid}</td>
                    <td className="p-4 text-slate-400 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{date}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500 italic">Tiada data pelajar lagi. Minta pelajar login semula untuk daftar.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
