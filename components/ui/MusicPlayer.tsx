"use client";

import React, { useState, useEffect, useRef } from "react";
import { CassetteTape, Minus } from "lucide-react";

interface AlbumTrack {
  id: string;
  name: string;
  subtitle: string;
  embedUrl: string;
  spotifyUri: string;
}

interface SpotifyEmbedController {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  destroy?: () => void;
  addListener?: (event: string, callback: (state: unknown) => void) => void;
}

interface SpotifyIFrameAPI {
  createController: (
    element: HTMLElement,
    options: {
      uri?: string;
      width?: string | number;
      height?: string | number;
      theme?: string;
    },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
    SpotifyIframeApi?: SpotifyIFrameAPI;
  }
}

const ALBUMS: AlbumTrack[] = [
  {
    id: "part-1",
    name: "Part 1",
    subtitle: "A Space for the Unbound OST",
    embedUrl: "https://open.spotify.com/embed/album/2l4L12zMeG1jCJzw5W9X0i?utm_source=generator&theme=0",
    spotifyUri: "spotify:album:2l4L12zMeG1jCJzw5W9X0i",
  },
  {
    id: "part-2",
    name: "Part 2",
    subtitle: "A Space for the Unbound OST",
    embedUrl: "https://open.spotify.com/embed/album/60nE8JNOFwhd1a0iTvbPW6?utm_source=generator&theme=0",
    spotifyUri: "spotify:album:60nE8JNOFwhd1a0iTvbPW6",
  },
  {
    id: "part-3",
    name: "Part 3",
    subtitle: "A Space for the Unbound OST",
    embedUrl: "https://open.spotify.com/embed/album/00iuihGVl5CGmyrOht4ASm?utm_source=generator&theme=0",
    spotifyUri: "spotify:album:00iuihGVl5CGmyrOht4ASm",
  },
];

export default function MusicPlayer() {
  // hasOpenedEver controls lazy mounting: false on initial page load (0 network requests to Spotify)
  const [hasOpenedEver, setHasOpenedEver] = useState(false);
  // isOpen controls visual expansion vs collapsed/minimized state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Spotify iFrame API EmbedController instance
  const embedControllerRef = useRef<SpotifyEmbedController | null>(null);

  // 1. Initialize Spotify iFrame API when widget is opened for the first time
  useEffect(() => {
    if (!hasOpenedEver) return;
    if (typeof window === "undefined") return;

    const initController = (IFrameAPI: SpotifyIFrameAPI) => {
      const iframeEl = iframeRef.current;
      if (!iframeEl) return;
      try {
        IFrameAPI.createController(iframeEl, {}, (controller: SpotifyEmbedController) => {
          embedControllerRef.current = controller;
        });
      } catch (err) {
        console.warn("Spotify controller creation note:", err);
      }
    };

    if (window.SpotifyIframeApi) {
      initController(window.SpotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
        initController(IFrameAPI);
      };
      if (!document.getElementById("spotify-iframe-api-script")) {
        const script = document.createElement("script");
        script.id = "spotify-iframe-api-script";
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [hasOpenedEver]);

  // 2. Listen to custom event 'asftu:pause-music' (dispatched when trailer modal opens)
  useEffect(() => {
    const handlePauseMusic = () => {
      // Pause playback via official Spotify EmbedController
      if (embedControllerRef.current && typeof embedControllerRef.current.pause === "function") {
        embedControllerRef.current.pause();
      }
      // Failsafe postMessage to iframe
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ command: "pause" }, "*");
      }
    };

    window.addEventListener("asftu:pause-music", handlePauseMusic);
    return () => window.removeEventListener("asftu:pause-music", handlePauseMusic);
  }, []);

  // 3. Minimize on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 4. Minimize on click outside the player card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle opening widget
  const handleOpen = () => {
    if (!hasOpenedEver) {
      setHasOpenedEver(true);
    }
    setIsOpen(true);
  };

  // Handle switching album tabs
  const handleSwitchTab = (idx: number) => {
    setActiveTab(idx);
    const selected = ALBUMS[idx];
    if (embedControllerRef.current && typeof embedControllerRef.current.loadUri === "function") {
      embedControllerRef.current.loadUri(selected.spotifyUri);
    }
    // Always keep src updated as reliable fallback
    if (iframeRef.current) {
      iframeRef.current.src = selected.embedUrl;
    }
  };

  const activeAlbum = ALBUMS[activeTab];

  return (
    <>
      {/* ============================================================
         SIBLING 1: COLLAPSED FLOATING BUTTON
         - Independent fixed positioning strictly at viewport bottom-4 right-4 (sm:bottom-6 sm:right-6).
         - NEVER nested inside the card container, so its position NEVER shifts when the card expands/collapses!
         - Styled as a 90s cassette tape with chunky retro pixel borders.
         ============================================================ */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none print:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-0 scale-75 pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
        aria-label="Floating OST Music Player Button"
      >
        <button
          onClick={handleOpen}
          className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-primary text-bg-primary flex items-center justify-center border-2 border-[#0B1026] shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_20px_rgba(244,201,93,0.35),inset_0_2px_0_rgba(255,255,255,0.4)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.7),0_0_28px_rgba(244,201,93,0.55),inset_0_2px_0_rgba(255,255,255,0.5)] cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ring-2 ring-brand-primary/60 ring-offset-2 ring-offset-[#0B1026]"
          aria-label="Buka pemutar musik OST resmi A Space for the Unbound"
          title="Kaset OST 1999 • A Space for the Unbound"
        >
          {/* Subtle pulsing background aura ring */}
          <span
            className="absolute -inset-1 rounded-2xl bg-brand-primary/30 animate-ping pointer-events-none"
            style={{ animationDuration: "2.8s" }}
            aria-hidden="true"
          />
          {/* Ambient breathing glow */}
          <span
            className="absolute -inset-2 rounded-2xl bg-brand-primary/20 blur-sm pointer-events-none animate-pulse"
            aria-hidden="true"
          />

          {/* 90s Cassette Tape Icon with crisp stroke & hover tilt */}
          <CassetteTape
            className="w-6 h-6 sm:w-7 sm:h-7 text-bg-primary group-hover:rotate-6 transition-transform duration-200 relative z-10"
            strokeWidth={2.2}
            aria-hidden="true"
          />

          {/* Status indicator: green active dot once user has started listening */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-secondary rounded-full border-2 border-bg-primary flex items-center justify-center z-20 shadow-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${hasOpenedEver ? "bg-[#00E5C7] animate-pulse" : "bg-white"}`} />
          </span>
        </button>
      </div>

      {/* ============================================================
         SIBLING 2: EXPANDED / PERSISTENT CARD CONTAINER
         - Independent fixed container at bottom-4 right-4 sm:bottom-6 sm:right-6.
         - Mounted into DOM ONLY AFTER user opens widget for the first time (lazy mount).
         - Once mounted (hasOpenedEver === true), it REMAINS IN DOM FOREVER.
         - When collapsed, it is hidden via CSS (height: 0, width: 0, overflow: hidden, opacity: 0).
           This ensures Spotify audio NEVER stops when the widget is minimized,
           AND its collapse can NEVER affect the sibling button's position!
         ============================================================ */}
      {hasOpenedEver && (
        <div
          ref={cardRef}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none print:hidden transition-all duration-300 origin-bottom-right ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto visible block"
              : "w-0 h-0 max-w-0 max-h-0 opacity-0 scale-95 pointer-events-none overflow-hidden invisible"
          }`}
          style={
            !isOpen
              ? {
                  width: 0,
                  height: 0,
                  maxWidth: 0,
                  maxHeight: 0,
                  opacity: 0,
                  visibility: "hidden",
                  overflow: "hidden",
                  pointerEvents: "none",
                }
              : {
                  width: "auto",
                  height: "auto",
                  opacity: 1,
                  visibility: "visible",
                  overflow: "visible",
                  pointerEvents: "auto",
                }
          }
          role="region"
          aria-label="Pemutar musik OST resmi A Space for the Unbound"
        >
          <div className="w-[calc(100vw-2rem)] max-w-[340px] sm:max-w-[360px] bg-bg-secondary/95 border border-brand-primary/40 rounded-xl p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(244,201,93,0.15)] backdrop-blur-md text-text-main flex flex-col gap-2.5">
            {/* Card Header: Title + Minimize Button */}
            <div className="flex items-center justify-between border-b border-brand-primary/20 pb-2">
              <div className="flex items-center gap-2">
                <CassetteTape className="w-4 h-4 text-brand-primary animate-pulse" />
                <h3 className="font-display text-xs sm:text-sm text-brand-primary tracking-wider uppercase font-bold">
                  Dengarkan OST Resmi
                </h3>
              </div>
              {/* Collapse/Minimize Button: hides card visually while keeping audio playing */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#9AAFC4] hover:text-brand-primary hover:bg-bg-primary/50 rounded-full transition-colors cursor-pointer"
                aria-label="Minimize pemutar musik (musik tetap berputar)"
                title="Minimize (musik tetap berputar)"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Album Tabs (Part 1, Part 2, Part 3) */}
            <div
              className="grid grid-cols-3 gap-1.5 p-1 bg-bg-primary/80 border border-brand-primary/20 rounded-lg"
              role="tablist"
              aria-label="Pilihan album OST"
            >
              {ALBUMS.map((album, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={album.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${album.id}`}
                    id={`tab-${album.id}`}
                    onClick={() => handleSwitchTab(idx)}
                    className={`py-1.5 px-2 text-[11px] font-mono font-bold tracking-wider rounded transition-all cursor-pointer text-center ${
                      isActive
                        ? "bg-brand-primary text-bg-primary shadow-xs"
                        : "text-[#D1DCE8] hover:text-brand-primary hover:bg-bg-secondary/60"
                    }`}
                  >
                    {album.name}
                  </button>
                );
              })}
            </div>

            {/* Spotify Compact Embed Iframe
                PERSISTENT: Once mounted, stays in DOM across collapse/expand.
                Managed via Spotify iFrame API EmbedController for auto-pause on trailer. */}
            <div
              id={`tabpanel-${activeAlbum.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeAlbum.id}`}
              className="relative w-full rounded-xl overflow-hidden bg-bg-primary/90 border border-[#2D3748] min-h-[152px]"
            >
              <iframe
                ref={iframeRef}
                id="spotify-ost-player-iframe"
                src={activeAlbum.embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify Player - A Space for the Unbound ${activeAlbum.name}`}
                className="rounded-xl w-full"
                style={{ borderRadius: "12px", border: 0 }}
              />
            </div>

            {/* Credit Attribution */}
            <p className="font-mono text-[10px] leading-tight text-[#9AAFC4] text-center pt-0.5">
              Musik oleh <span className="text-text-main font-semibold">Masdito &lsquo;ittou&rsquo; Bachtiar</span> &amp; tim, tersedia resmi di Spotify
            </p>
          </div>
        </div>
      )}
    </>
  );
}

