"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Search, X, Command, Mic, ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react';

// SpeechRecognition Types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  start: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
  size?: 'default' | 'compact' | 'large';
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

// Mock data für Demo
const mockSuggestions = [
  { id: 1, text: "Vermisste Person Berlin", category: "Vermisst", trend: true },
  { id: 2, text: "Fahndung nach Diebstahl", category: "Fahndung" },
  { id: 3, text: "Sicherheitswarnung aktuell", category: "Warnung", trend: true },
];

const recentSearches = [
  "Fahndung München",
  "Vermisst seit heute",
  "Polizei Meldung"
];

/**
 * Normal SearchBar Component für Filterbereich
 * Vollständige Suchleiste mit allen Features
 */
export function SearchBar({ 
  variant = "desktop", 
  size = "default", 
  className = "",
  placeholder = "Suche nach Fahndungen, Vermissten...",
  onSearch,
  onClear,
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for voice support
  useEffect(() => {
    setHasVoiceSupport('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  // CMD+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // Delay to prevent immediate close on open
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Debounced search function
  const debouncedSearch = useDebouncedCallback((term: string) => {
    if (term.trim()) {
      const searchUrl = `/suche?q=${encodeURIComponent(term.trim())}`;
      window.location.href = searchUrl;
    }
  }, 300);

  // Handle voice search
  const handleVoiceSearch = useCallback(() => {
    if (!hasVoiceSupport) return;

    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setQuery(transcript);
        setIsOpen(true);
        onSearch?.(transcript);
        debouncedSearch(transcript);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Spracherkennung fehlgeschlagen');
    };

    recognition.start();
  }, [hasVoiceSupport, onSearch, debouncedSearch]);

  // Handle Input Change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsOpen(true);
    onSearch?.(newQuery);
    debouncedSearch(newQuery);
  }, [onSearch, debouncedSearch]);

  // Handle Form Submit
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchUrl = `/suche?q=${encodeURIComponent(query.trim())}`;
      window.location.href = searchUrl;
    }
  }, [query]);

  // Handle Clear
  const handleClear = useCallback(() => {
    setQuery('');
    setIsOpen(false);
    onClear?.();
    inputRef.current?.focus();
  }, [onClear]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const suggestions = query ? mockSuggestions.filter(s => 
      s.text.toLowerCase().includes(query.toLowerCase())
    ) : [];
    const totalItems = suggestions.length + recentSearches.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          // Handle selection
          console.log('Selected item at index:', selectedIndex);
        } else if (query) {
          // Handle search
          const searchUrl = `/suche?q=${encodeURIComponent(query.trim())}`;
          window.location.href = searchUrl;
        }
        break;
      case 'Escape':
        if (query) {
          handleClear();
        } else {
          inputRef.current?.blur();
        }
        break;
    }
  }, [query, selectedIndex, handleClear]);

  // Focus Handlers
  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };
  const handleBlur = () => setIsFocused(false);

  const suggestions = query ? mockSuggestions.filter(s => 
    s.text.toLowerCase().includes(query.toLowerCase())
  ) : [];

  const iconSize = size === 'large' ? 'w-5 h-5' : 'w-4 h-4';

  const baseClasses = "relative group transition-all duration-300 ease-out";
  const variantClasses = variant === 'desktop' 
    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg shadow-gray-200/20 dark:shadow-black/20"
    : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-2xl";

  const sizeClasses = {
    default: "px-5 py-3.5",
    compact: "px-4 py-3",
    large: "px-6 py-4"
  };

  const inputSizeClasses = {
    default: "text-base",
    compact: "text-sm",
    large: "text-lg"
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Main Search Bar */}
      <div className={`
        ${baseClasses}
        ${isOpen ? 'scale-[1.02]' : 'scale-100'}
      `}>
        {/* Glow effect */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl
          ${isFocused ? 'opacity-100' : ''}
        `} />

        {/* Search Container */}
        <form onSubmit={handleSubmit} className={`
          relative flex items-center gap-3 
          ${variantClasses}
          ${sizeClasses[size]}
          transition-all duration-300
          ${isFocused ? 'border-blue-500/50 dark:border-blue-400/50' : ''}
          ${isOpen ? 'rounded-b-none border-b-0' : ''}
        `}>
          {/* Search Icon with animation */}
          <Search className={`
            ${iconSize} transition-all duration-300
            ${isFocused ? 'text-blue-500 dark:text-blue-400 rotate-12' : 'text-gray-400'}
          `} />

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`
              flex-1 bg-transparent outline-none
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              ${inputSizeClasses[size]}
            `}
            autoComplete="off"
            spellCheck="false"
            autoFocus={autoFocus}
            aria-label="Fahndungsportal durchsuchen"
            aria-describedby="search-hint"
            aria-expanded={isOpen}
            aria-controls="search-results"
            role="combobox"
            aria-autocomplete="list"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Clear button */}
            {query && (
              <button
                onClick={handleClear}
                className="
                  p-1.5 rounded-lg
                  text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                aria-label="Suche löschen"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Voice Search */}
            {hasVoiceSupport && (
              <button
                onClick={handleVoiceSearch}
                className={`
                  p-1.5 rounded-lg transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isListening 
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                aria-label="Sprachsuche"
                type="button"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}

            {/* AI Assistant */}
            <button
              className="
                p-1.5 rounded-lg
                text-purple-500 hover:text-purple-600
                hover:bg-purple-50 dark:hover:bg-purple-900/20
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
              aria-label="KI-Assistent"
              type="button"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Keyboard shortcut hint */}
            <kbd className="
              hidden sm:flex items-center gap-1 px-2 py-1
              text-xs text-gray-500 dark:text-gray-400
              bg-gray-100 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-lg font-mono
            ">
              <Command className="w-3 h-3" />K
            </kbd>
          </div>
        </form>

        {/* Search Results Dropdown */}
        {isOpen && (
          <div 
            id="search-results"
            className="
              absolute top-full left-0 right-0 z-50
              bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
              border border-t-0 border-gray-200/50 dark:border-gray-700/50
              rounded-b-2xl shadow-2xl shadow-gray-200/20 dark:shadow-black/40
              max-h-96 overflow-y-auto
              animate-in slide-in-from-top-2 duration-200
            "
            role="listbox"
          >
            {/* Quick Actions */}
            <div className="p-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>KI-Vorschläge</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="
                  px-3 py-1.5 text-sm
                  bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400
                  hover:bg-blue-100 dark:hover:bg-blue-900/30
                  rounded-lg transition-colors duration-200
                ">
                  Aktuelle Fahndungen
                </button>
                <button className="
                  px-3 py-1.5 text-sm
                  bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400
                  hover:bg-purple-100 dark:hover:bg-purple-900/30
                  rounded-lg transition-colors duration-200
                ">
                  Vermisste heute
                </button>
              </div>
            </div>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <Search className="w-3 h-3" />
                  <span>Vorschläge</span>
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    className={`
                      w-full flex items-center justify-between p-3 -mx-3
                      hover:bg-gray-50 dark:hover:bg-gray-800/50
                      rounded-lg transition-colors duration-200
                      ${selectedIndex === index ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                    `}
                    role="option"
                    aria-selected={selectedIndex === index}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900 dark:text-white">
                        {suggestion.text}
                      </span>
                      <span className="
                        text-xs px-2 py-0.5 rounded-full
                        bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400
                      ">
                        {suggestion.category}
                      </span>
                      {suggestion.trend && (
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <Clock className="w-3 h-3" />
                  <span>Letzte Suchen</span>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={search}
                    className={`
                      w-full flex items-center justify-between p-3 -mx-3
                      hover:bg-gray-50 dark:hover:bg-gray-800/50
                      rounded-lg transition-colors duration-200
                      ${selectedIndex === suggestions.length + index ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                    `}
                    onClick={() => setQuery(search)}
                    role="option"
                    aria-selected={selectedIndex === suggestions.length + index}
                    type="button"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{search}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {suggestions.length > 0 && `${suggestions.length} Vorschläge verfügbar`}
      </div>
      
      <span id="search-hint" className="sr-only">
        Drücken Sie Strg+K oder Cmd+K um die Suche zu öffnen. 
        Verwenden Sie die Pfeiltasten zur Navigation.
      </span>
    </div>
  );
}