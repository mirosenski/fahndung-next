"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { 
  Search, X, Loader2, ChevronRight, 
  AlertCircle, Users, UserX, Skull, Package, Filter,
  Shield, ChevronDown, Siren
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "~/lib/utils";

// Fahndungskategorien
const categories = [
  { id: 'all', label: 'Alle Fahndungen', icon: Shield, color: 'blue' },
  { id: 'urgent', label: 'Eilfahndung', icon: Siren, color: 'red', badge: 'EILIG' },
  { id: 'missing', label: 'Vermisste Personen', icon: Users, color: 'amber' },
  { id: 'wanted', label: 'Gesuchte Straftäter', icon: UserX, color: 'orange' },
  { id: 'unknown', label: 'Unbekannte Tote', icon: Skull, color: 'purple' },
  { id: 'items', label: 'Sachfahndung', icon: Package, color: 'green' }
];

// Regionen Baden-Württemberg
const regions = [
  'Alle Regionen',
  'Stuttgart',
  'Karlsruhe',
  'Freiburg',
  'Tübingen',
  'Heilbronn',
  'Ulm',
  'Mannheim',
  'Pforzheim',
  'Reutlingen',
  'Esslingen'
];

// Mock aktuelle Fahndungen
const currentAlerts = [
  { id: 1, type: 'urgent', title: 'Vermisste 15-Jährige aus Stuttgart', time: 'vor 2 Stunden' },
  { id: 2, type: 'wanted', title: 'Raubüberfall in Karlsruhe - Täter flüchtig', time: 'vor 5 Stunden' },
  { id: 3, type: 'missing', title: 'Senior aus Freiburg vermisst', time: 'vor 1 Tag' }
];

interface SearchModalProps {
  className?: string;
  size?: 'compact' | 'default';
}

export function SearchModal({ className = "", size = "default" }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Alle Regionen');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Focus management
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Kleines Delay für smoothe Animation
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + K zum Öffnen
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSearch = () => {
    setIsSearching(true);
    const params = new URLSearchParams({
      ...(query && { q: query }),
      ...(selectedCategory !== 'all' && { cat: selectedCategory }),
      ...(selectedRegion !== 'Alle Regionen' && { region: selectedRegion }),
      ...(dateRange.from && { from: dateRange.from }),
      ...(dateRange.to && { to: dateRange.to }),
      page: '1',
    });
    router.push(`/fahndungen?${params.toString()}`);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setSelectedCategory('all');
    setShowFilters(false);
    // Return focus to trigger
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 100);
  };

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    };
    return colors[color] ?? colors.blue;
  };

  const getAlertTypeIcon = (type: string) => {
    const cat = categories.find(c => c.id === type);
    return cat ? cat.icon : Shield;
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          size === 'compact' ? "p-1.5 w-8 h-8" : "p-2 w-10 h-10",
          className
        )}
        aria-label="Fahndungssuche öffnen (Strg+K)"
        aria-keyshortcuts="Control+K"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Search className={size === 'compact' ? "w-4 h-4" : "w-5 h-5"} />
        
        {/* Professional Tooltip */}
        <span className="
          absolute -top-14 left-1/2 -translate-x-1/2
          px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700
          rounded-lg opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none
          whitespace-nowrap shadow-lg
          hidden sm:block
        ">
          Fahndungssuche (⌘K)
        </span>
      </button>

      {/* Search Modal */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl p-0 gap-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              🔍 Fahndungssuche Baden-Württemberg
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6">
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Suche nach Fahndungen, Vermissten, Straftätern..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategorien:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2",
                        selectedCategory === category.id && getCategoryColor(category.color)
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                      {category.badge && (
                        <Badge variant="destructive" className="ml-1 text-xs">
                          {category.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <Filter className="w-4 h-4" />
                Erweiterte Filter
                <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
              </Button>
              
              {showFilters && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Region
                      </label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Zeitraum
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          value={dateRange.from}
                          onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                          className="flex-1"
                        />
                        <Input
                          type="date"
                          value={dateRange.to}
                          onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Current Alerts */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Aktuelle Eilmeldungen:</span>
              </div>
              <div className="space-y-2">
                {currentAlerts.map((alert) => {
                  const Icon = getAlertTypeIcon(alert.type);
                  return (
                    <div
                      key={alert.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <Icon className="w-5 h-5 text-red-500" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{alert.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{alert.time}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Search Actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Drücken Sie <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> zum Suchen
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Abbrechen
                </Button>
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Suche...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Suchen
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 