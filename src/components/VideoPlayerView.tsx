"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Plus,
  Download,
  CheckCircle2,
  Circle,
  FileText,
  Play,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { VideoLesson, allVideoLessons } from "@/data/physicsData";

interface VideoPlayerViewProps {
  currentLesson: VideoLesson;
  onBack: () => void;
  onSelectLesson: (lesson: VideoLesson) => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  currentLesson,
  onBack,
  onSelectLesson
}) => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "qa">("overview");
  const [sidebarTab, setSidebarTab] = useState<"playlist" | "tools">("playlist");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1240);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState([
    { name: "Ahmad Rizky", text: "Terbaik Sir! Baru faham melukis sinar selari dan sinar fokus.", time: "2 jam lepas" },
    { name: "Siti Sarah", text: "Fast explanation and clear graphics for DLP students!", time: "5 jam lepas" },
    { name: "Cikgu Tan", text: "Sangat membantu untuk ulangkaji SPM murid.", time: "1 hari lepas" }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{ name: "Pelajar Fizik", text: newComment, time: "Baru sahaja" }, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-6 space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#121622] hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>{t("backToHome")}</span>
        </button>

        <div className="flex items-center space-x-3 text-xs font-bold text-slate-400">
          <span>{currentLesson.week}</span>
          <span>•</span>
          <span className="text-red-400">
            {lang === "bm" ? currentLesson.chapterBm : currentLesson.chapterDlp}
          </span>
        </div>
      </div>

      {/* Main Grid: Player on Left, Playlist/Tools on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Video Player & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player Container */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-slate-800 shadow-2xl group">
            {/* Google Drive Video Preview Embed */}
            <iframe
              src={`https://drive.google.com/file/d/${currentLesson.driveId}/preview`}
              className="w-full h-full border-0"
              allow="autoplay"
              title={currentLesson.titleBm}
            ></iframe>

            {/* Custom Overlay Brand Watermark */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="PhysicsSPMFlix" className="h-4 w-auto object-contain" />
            </div>
          </div>

          {/* Video Header & Actions */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-extrabold text-red-500 bg-red-950/60 border border-red-800/60 px-2.5 py-0.5 rounded-md">
                {currentLesson.week}
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-2">
                {lang === "bm" ? currentLesson.titleBm : currentLesson.titleDlp}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {lang === "bm" ? `Tingkatan ${currentLesson.form} • ${currentLesson.chapterBm}` : `Form ${currentLesson.form} • ${currentLesson.chapterDlp}`}
              </p>
            </div>

            {/* Channel Info & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-b border-slate-800/80 py-3">
              {/* Channel */}
              <div className="flex items-center space-x-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="PhysicsSPMFlix" className="h-9 w-auto object-contain" />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-bold text-white">PhysicsSPMFlix</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[9px] flex items-center justify-center font-bold">
                      ✓
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{t("videoSubscribers")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-[#131826] rounded-full border border-slate-800 p-0.5">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      liked ? "bg-red-600 text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{likeCount}</span>
                  </button>
                  <button className="px-2.5 py-1.5 text-slate-400 hover:text-white border-l border-slate-800">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#131826] hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition">
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t("btnShare")}</span>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full border text-xs font-bold transition ${
                    isSaved
                      ? "bg-emerald-950/60 border-emerald-500 text-emerald-400"
                      : "bg-[#131826] hover:bg-slate-800 border-slate-800 text-slate-300"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t("btnAddList")}</span>
                </button>
              </div>
            </div>

            {/* Description Banner */}
            <div className="p-4 rounded-2xl bg-[#111522] border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <p>
                {lang === "bm"
                  ? `Video pengajaran KSSM Fizik Tingkatan 4 (${currentLesson.week}) yang merangkumi pemahaman teori, melukis rajah sinar, serta aplikasi penyelesaian masalah SPM.`
                  : `KSSM Form 4 Physics lesson video (${currentLesson.week}) covering theoretical concepts, ray diagrams, and SPM problem solving applications.`}
              </p>
              <a
                href={`https://drive.google.com/file/d/${currentLesson.driveId}/view`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-red-400 font-bold hover:underline"
              >
                <span>Google Drive Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Detail Tabs Section */}
          <div className="space-y-4">
            <div className="flex border-b border-slate-800 space-x-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 transition ${
                  activeTab === "overview"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabOverview")}
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-3 transition ${
                  activeTab === "notes"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabNotes")}
              </button>
              <button
                onClick={() => setActiveTab("qa")}
                className={`pb-3 transition ${
                  activeTab === "qa"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabQA")}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {t("whatYoullLearn")}
                  </h3>
                  <ul className="space-y-2">
                    {(lang === "bm" ? currentLesson.learningPointsBm : currentLesson.learningPointsDlp).map(
                      (point, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {t("keyConcepts")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(lang === "bm" ? currentLesson.keyConceptsBm : currentLesson.keyConceptsDlp).map(
                      (concept, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#1a2133] border border-slate-700/60 rounded-lg text-xs font-medium text-slate-200"
                        >
                          {concept}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
                <h3 className="text-sm font-bold text-white">
                  Nota Ringkas & Formula SPM ({currentLesson.week})
                </h3>
                <p>
                  1. Pastikan perhatikan tanda positif dan negatif bagi jarak objek (u) dan jarak imej (v).
                </p>
                <p>
                  2. Kanta Cembung (Convex Lens) berfungsi menumpukan sinar cahaya pada titik fokus (F).
                </p>
                <p>
                  3. Formula Kanta / Cermin: <code className="bg-[#1c2438] px-2 py-0.5 rounded text-red-400 font-mono">1/f = 1/u + 1/v</code>
                </p>
              </div>
            )}

            {activeTab === "qa" && (
              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-4">
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tanya soalan tentang video ini..."
                    className="flex-1 px-4 py-2 bg-[#171e2e] border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition"
                  >
                    Hantar
                  </button>
                </form>

                <div className="space-y-3 pt-2">
                  {comments.map((c, i) => (
                    <div key={i} className="p-3 bg-[#161c2c] border border-slate-800 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="font-bold text-slate-200">{c.name}</span>
                        <span>{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-300">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar (Playlist / Learning Tools) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-3xl bg-[#101420] border border-slate-800/80 shadow-2xl space-y-5">
            {/* Playlist vs Learning Tools Segmented Switch */}
            <div className="flex bg-[#161c2b] p-1 rounded-2xl border border-slate-800">
              <button
                onClick={() => setSidebarTab("playlist")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  sidebarTab === "playlist"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("tabPlaylist")}
              </button>
              <button
                onClick={() => setSidebarTab("tools")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  sidebarTab === "tools"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("tabLearningTools")}
              </button>
            </div>

            {/* Download Notes Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 via-indigo-950/40 to-slate-900 border border-purple-800/40 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t("downloadNotesTitle")}</h4>
                  <p className="text-[10px] text-slate-400">{t("downloadNotesSub")}</p>
                </div>
              </div>

              <a
                href={`https://drive.google.com/file/d/${currentLesson.driveId}/view`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg shadow-purple-950"
              >
                <Download className="w-4 h-4" />
                <span>{t("btnDownloadPDF")}</span>
              </a>
            </div>

            {/* Chapters / Videos Playlist */}
            {sidebarTab === "playlist" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {t("tabChapters")} ({allVideoLessons.length} Video)
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold">{t("hide")}</span>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {allVideoLessons.map((lesson, idx) => {
                    const isCurrent = lesson.id === currentLesson.id;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`group cursor-pointer p-3 rounded-2xl border transition flex items-center space-x-3 ${
                          isCurrent
                            ? "bg-red-950/40 border-red-600/80 ring-1 ring-red-500/40"
                            : "bg-[#141a28] hover:bg-[#1a2234] border-slate-800/80"
                        }`}
                      >
                        {/* Mini Thumbnail */}
                        <div className="relative w-16 h-12 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                          {isCurrent ? (
                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
                              <Play className="w-3 h-3 fill-white ml-0.5" />
                            </div>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="flex-1 overflow-hidden">
                          <span className="text-[9px] font-bold text-red-400 block">
                            {lesson.week}
                          </span>
                          <h5
                            className={`text-xs font-bold truncate ${
                              isCurrent ? "text-red-400" : "text-slate-200 group-hover:text-white"
                            }`}
                          >
                            {lang === "bm" ? lesson.titleBm : lesson.titleDlp}
                          </h5>
                          <span className="text-[10px] text-slate-400">{lesson.duration}</span>
                        </div>

                        {/* Completion Icon */}
                        <div>
                          {idx < 3 ? (
                            <CheckCircle2 className="w-4 h-4 text-red-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Resources Attachments */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {t("resourcesTitle")}
              </h4>

              <div className="space-y-2">
                {currentLesson.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#141a28] hover:bg-[#1a2234] border border-slate-800 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                          res.type === "pdf"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : res.type === "docx"
                            ? "bg-blue-950 text-blue-400 border border-blue-800"
                            : "bg-amber-950 text-amber-400 border border-amber-800"
                        }`}
                      >
                        {res.type.toUpperCase()}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200 group-hover:text-white truncate max-w-[160px]">
                          {lang === "bm" ? res.titleBm : res.titleDlp}
                        </h5>
                        <span className="text-[10px] text-slate-400">{res.size}</span>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
