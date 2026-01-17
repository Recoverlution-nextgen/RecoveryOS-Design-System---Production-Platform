/**
 * Profile/Settings Page - infiniteK Design System
 * 
 * Comprehensive settings and administration page for both patients and admins.
 * Redesigned with Navigate-level elegance and sophistication.
 * 
 * Design Philosophy:
 * - Assets are the heroes - let them breathe
 * - Text overlays directly on assets with text-shadow
 * - Glassmorphism ONLY on interactive elements
 * - Eyebrow + Headline LEFT, Description RIGHT for sections
 * - NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 * - Mobile-first responsive with clamp() typography
 * 
 * Tabs:
 * - My Profile (universal - patients + admins)
 * - Patient Management ⭐ (admin only - THE POWER TAB!)
 * - Therapists (admin only)
 * - Alumni (admin only)
 * - Integrations (admin only)
 * - Admin (admin only - org settings)
 */

import { useState } from "react";
import { User, Settings, Users, GraduationCap, Plug, Video, FileText, Calendar, Building2, Mail, Phone, MapPin, Edit, Save, X, Plus, Search, Filter, MoreVertical, Check, Clock, DollarSign, Link as LinkIcon, ExternalLink, Trash2, ArrowLeft, Shield, Crown, ChevronRight, Zap, Bell, Lock, Eye, Globe, Smartphone, Watch, Activity, Moon, Brain, Apple, Heart, Waves, CloudRain, Target, PlayCircle, Sparkles, MessageCircle, Cloud, HardDrive, Share2, ChevronDown } from "lucide-react";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { getTourStatus, resetTourStatus, hasTourBeenCompleted, hasTourBeenSkipped } from "../../utils/tourStatus";

type ProfileTab = "My Profile" | "Patient Management" | "Therapists" | "Alumni" | "Integrations" | "Admin";
type IntegrationView = "overview" | "meetings" | "files" | "events";

// Detect if user is admin (in real app, this would come from auth/context)
const IS_ADMIN = true; // Set to false to see patient view

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "active" | "alumni" | "pending";
  therapist?: string;
  admissionDate: string;
  program: string;
  pillar: string;
}

interface Therapist {
  id: number;
  name: string;
  email: string;
  specialty: string;
  rate: number;
  calendarSynced: boolean;
  patients: number;
  availability: "available" | "limited" | "full";
}

interface Integration {
  id: string;
  name: string;
  category: "meetings" | "files" | "events";
  connected: boolean;
  icon: any;
  description: string;
  provider?: string;
}

export function ProfilePage({ onBack }: { onBack?: () => void }) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("My Profile");
  const [integrationView, setIntegrationView] = useState<IntegrationView>("overview");
  const [isEditing, setIsEditing] = useState(false);

  const profileTabs: ProfileTab[] = IS_ADMIN 
    ? ["My Profile", "Patient Management", "Therapists", "Alumni", "Integrations", "Admin"]
    : ["My Profile"];

  return (
    <div className="flex-1 flex flex-col" style={{ background: 'var(--background)' }}>
      {/* Profile Hero Header */}
      <PlatformPageHeader
        page="Profile"
        headline={IS_ADMIN ? "Settings & Administration" : "My Settings"}
        subheadline={IS_ADMIN ? "Manage your profile, team, and platform integrations" : "Manage your profile and preferences"}
        height="compact"
        actions={
          IS_ADMIN ? (
            <div 
              className="flex items-center gap-2"
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--radius-none)'
              }}
            >
              <Crown className="w-4 h-4 text-yellow-300" />
              <span 
                className="text-white"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
              >
                Admin Access
              </span>
            </div>
          ) : undefined
        }
      />

      {/* Mobile Elegant Dropdown */}
      <div 
        className="lg:hidden"
        style={{
          background: 'var(--glass-bg-medium)',
          backdropFilter: 'var(--glass-blur-default)',
          WebkitBackdropFilter: 'var(--glass-blur-default)',
          border: 'none',
          borderBottom: 'var(--glass-border-default)',
          padding: 'var(--spacing-4) var(--spacing-6)'
        }}
      >
        <div style={{ position: 'relative' }}>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as ProfileTab)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-none)',
              padding: 'var(--spacing-3) var(--spacing-10) var(--spacing-3) var(--spacing-4)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              appearance: 'none',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {profileTabs.map((tab) => (
              <option key={tab} value={tab}>{tab}</option>
            ))}
          </select>
          <ChevronDown 
            className="w-4 h-4" 
            style={{ 
              position: 'absolute',
              right: 'var(--spacing-4)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              pointerEvents: 'none'
            }} 
          />
        </div>
      </div>

      {/* Desktop Tab Navigation */}
      <div className="hidden lg:block border-b-2 border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex gap-1 overflow-x-auto">
            {profileTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "border-[#3E2BB8] text-[#3E2BB8]"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontWeight: activeTab === tab ? 600 : 500
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12">
          {activeTab === "My Profile" && <MyProfileContent isEditing={isEditing} setIsEditing={setIsEditing} />}
          {activeTab === "Patient Management" && IS_ADMIN && <PatientManagementContent />}
          {activeTab === "Therapists" && IS_ADMIN && <TherapistsContent />}
          {activeTab === "Alumni" && IS_ADMIN && <AlumniContent />}
          {activeTab === "Integrations" && IS_ADMIN && (
            <IntegrationsContent 
              view={integrationView} 
              setView={setIntegrationView} 
            />
          )}
          {activeTab === "Admin" && IS_ADMIN && <AdminContent />}
        </div>
      </div>
    </div>
  );
}

// My Profile Content - UNIVERSAL for all users
function MyProfileContent({ isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: (v: boolean) => void }) {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-2)'
            }}
          >
            My Profile
          </h2>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
              color: 'var(--text-secondary)'
            }}
          >
            Your personal information visible across the platform
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full md:w-auto"
          style={{
            padding: 'var(--spacing-3) var(--spacing-6)',
            background: isEditing ? '#F3F4F6' : 'var(--brand-primary)',
            color: isEditing ? 'var(--text-primary)' : '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-none)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-2)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!isEditing) e.currentTarget.style.background = 'var(--brand-secondary)';
          }}
          onMouseLeave={(e) => {
            if (!isEditing) e.currentTarget.style.background = 'var(--brand-primary)';
          }}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Photo */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.05), rgba(62, 43, 184, 0.03))',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          borderRadius: 'var(--radius-none)'
        }}
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div 
            style={{
              width: 'clamp(80px, 18vw, 96px)',
              height: 'clamp(80px, 18vw, 96px)',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-none)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2rem)',
              flexShrink: 0,
              border: '2px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            AJ
          </div>
          <div className="flex-1">
            <h3 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 600, 
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-2)'
              }}
            >
              Profile Photo
            </h3>
            <p 
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-4)',
                lineHeight: 1.6
              }}
            >
              JPG, PNG or GIF. Max size 2MB. Your photo is visible to your care team and community.
            </p>
            {isEditing && (
              <button 
                style={{
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  background: '#FFFFFF',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 'var(--radius-none)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(62, 43, 184, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }}
              >
                Upload New Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div 
        style={{
          background: '#FAFAFA',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          borderRadius: 'var(--radius-none)'
        }}
      >
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 600, 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            { label: "Full Name", value: "Alex Jordan", type: "text" },
            { label: "Email Address", value: "alex.jordan@email.com", type: "email" },
            { label: "Phone Number", value: "+1 (555) 123-4567", type: "tel" },
            { label: "Location (Optional)", value: "San Francisco, CA", type: "text", placeholder: "City, State" }
          ].map((field, index) => (
            <div key={index}>
              <label 
                style={{ 
                  display: 'block',
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)'
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                defaultValue={field.value}
                placeholder={field.placeholder}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3) var(--spacing-4)',
                  border: `2px solid ${isEditing ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                  background: isEditing ? '#FFFFFF' : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 'var(--radius-none)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                  color: isEditing ? 'var(--text-primary)' : 'var(--text-secondary)',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  if (isEditing) e.currentTarget.style.borderColor = 'rgba(62, 43, 184, 0.3)';
                }}
                onBlur={(e) => {
                  if (isEditing) e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }}
              />
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-6 pt-6 flex justify-end" style={{ borderTop: '2px solid rgba(0, 0, 0, 0.1)' }}>
            <button 
              style={{
                padding: 'var(--spacing-3) var(--spacing-8)',
                background: 'var(--brand-primary)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-none)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-primary)';
              }}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Preferences */}
      <div 
        style={{
          background: '#FAFAFA',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          borderRadius: 'var(--radius-none)'
        }}
      >
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 600, 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          Preferences
        </h3>

        <div className="space-y-6">
          {/* Notifications */}
          <div>
            <h4 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 600,
                fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-3)'
              }}
            >
              Notifications
            </h4>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email Notifications", description: "Receive updates via email" },
                { icon: Smartphone, label: "Push Notifications", description: "Get alerts on your device" },
                { icon: Phone, label: "SMS Notifications", description: "Text message reminders" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <item.icon className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                    <div>
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 600,
                          fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {item.label}
                      </div>
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
                          color: 'var(--text-tertiary)'
                        }}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-block w-12 h-6" style={{ flexShrink: 0 }}>
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div 
                      className="w-full h-full bg-gray-200 peer-checked:bg-[#3E2BB8] transition-all cursor-pointer"
                      style={{ borderRadius: 'var(--radius-none)' }}
                    ></div>
                    <div 
                      className="absolute left-1 top-1 w-4 h-4 bg-white transition-transform peer-checked:translate-x-6"
                      style={{ borderRadius: 'var(--radius-none)' }}
                    ></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Tour */}
          <div 
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6"
            style={{ borderTop: '2px solid rgba(0, 0, 0, 0.1)' }}
          >
            <div>
              <h4 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600,
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-1)'
                }}
              >
                Platform Tour
              </h4>
              <p 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                  color: 'var(--text-secondary)'
                }}
              >
                Restart the guided tour to explore platform features again
              </p>
            </div>
            <button 
              onClick={() => {
                resetTourStatus();
                window.location.reload();
              }}
              className="w-full md:w-auto"
              style={{
                padding: 'var(--spacing-3) var(--spacing-6)',
                background: '#FFFFFF',
                border: '2px solid rgba(0, 0, 0, 0.1)',
                borderRadius: 'var(--radius-none)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-2)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(62, 43, 184, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
              }}
            >
              <PlayCircle className="w-4 h-4" />
              Restart Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Patient Management Content ⭐ - THE POWER TAB!
function PatientManagementContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "alumni" | "pending">("all");
  const [viewMode, setViewMode] = useState<"detailed" | "overview">("detailed");

  // Mock patient data
  const allPatients: Patient[] = [
    { id: 1, name: "Sarah Miller", email: "sarah.m@email.com", phone: "+1 (555) 234-5678", status: "active", therapist: "Dr. Sarah Chen", admissionDate: "2025-01-15", program: "30-Day Intensive", pillar: "Emotional Regulation" },
    { id: 2, name: "James Wilson", email: "j.wilson@email.com", phone: "+1 (555) 345-6789", status: "active", therapist: "Michael Torres", admissionDate: "2025-02-01", program: "90-Day Extended Care", pillar: "Stress Resilience" },
    { id: 3, name: "Emily Chen", email: "emily.c@email.com", phone: "+1 (555) 456-7890", status: "alumni", therapist: "Dr. Jessica Martinez", admissionDate: "2024-11-10", program: "60-Day Standard", pillar: "Social Connectivity" },
    { id: 4, name: "Michael Davis", email: "m.davis@email.com", phone: "+1 (555) 567-8901", status: "active", therapist: "Dr. Sarah Chen", admissionDate: "2025-01-20", program: "60-Day Standard", pillar: "Cognitive Reframing" },
    { id: 5, name: "Lisa Anderson", email: "l.anderson@email.com", phone: "+1 (555) 678-9012", status: "active", therapist: "Emma Richardson", admissionDate: "2025-02-05", program: "30-Day Intensive", pillar: "Identity Integration" },
    { id: 6, name: "David Kim", email: "d.kim@email.com", phone: "+1 (555) 789-0123", status: "alumni", therapist: "Michael Torres", admissionDate: "2024-12-01", program: "90-Day Extended Care", pillar: "Decision Mastery" },
  ];

  const filteredPatients = allPatients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allPatients.length,
    active: allPatients.filter(p => p.status === "active").length,
    alumni: allPatients.filter(p => p.status === "alumni").length,
    pending: allPatients.filter(p => p.status === "pending").length
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Section with Stats - Asset-backed */}
      <div 
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-none)',
          overflow: 'hidden',
          minHeight: 'clamp(280px, 35vw, 320px)'
        }}
      >
        {/* Background Asset */}
        <img
          src="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/oneecosystem/Intelligence%20Layer.avif"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />

        {/* Content Overlay */}
        <div 
          className="relative z-10"
          style={{
            padding: 'clamp(1.5rem, 4vw, 2.5rem)'
          }}
        >
          {/* Eyebrow + Headline */}
          <div className="mb-6 md:mb-8">
            <div 
              className="inline-flex items-center gap-2 mb-4"
              style={{ 
                padding: 'var(--spacing-2) var(--spacing-4)',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(124, 103, 255, 0.4)',
                borderRadius: 'var(--radius-none)'
              }}
            >
              <Users className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} />
              <span
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  fontSize: 'clamp(0.625rem, 1.4vw, 0.6875rem)',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                Care Management
              </span>
            </div>
            
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 'var(--spacing-3)'
              }}
            >
              Patient Management
            </h2>

            <p 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
                lineHeight: 1.7,
                color: '#FFFFFF',
                maxWidth: '600px'
              }}
            >
              Monitor patient progress, manage assignments, and coordinate care across your team.
            </p>
          </div>

          {/* Stats Grid with Glass Background */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Total Patients", value: stats.total, color: '#7C67FF' },
              { label: "Active", value: stats.active, color: '#10B981' },
              { label: "Alumni", value: stats.alumni, color: '#3B82F6' },
              { label: "Pending", value: stats.pending, color: '#F59E0B' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  padding: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                  background: 'var(--glass-bg-strong)',
                  backdropFilter: 'var(--glass-blur-heavy)',
                  WebkitBackdropFilter: 'var(--glass-blur-heavy)',
                  border: 'var(--glass-border-strong)',
                  borderRadius: 'var(--radius-none)'
                }}
              >
                <div 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                    color: '#FFFFFF',
                    marginBottom: 'var(--spacing-1)'
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    color: stat.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
            style={{ color: 'var(--text-tertiary)' }} 
          />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: 'clamp(2.5rem, 6vw, 3rem)',
              paddingRight: 'var(--spacing-4)',
              paddingTop: 'var(--spacing-3)',
              paddingBottom: 'var(--spacing-3)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-none)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(62, 43, 184, 0.3)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            }}
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{
              padding: 'var(--spacing-3) var(--spacing-4)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-none)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="alumni">Alumni</option>
            <option value="pending">Pending</option>
          </select>

          {/* View Mode Toggle */}
          <div 
            className="flex items-center gap-1 p-1"
            style={{
              background: '#F3F4F6',
              borderRadius: 'var(--radius-none)'
            }}
          >
            <button
              onClick={() => setViewMode("detailed")}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                background: '#FFFFFF',
                color: viewMode === "detailed" ? 'var(--brand-primary)' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-none)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Detailed
            </button>
            <button
              onClick={() => setViewMode("overview")}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                background: '#FFFFFF',
                color: viewMode === "overview" ? 'var(--brand-primary)' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-none)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Overview
            </button>
          </div>

          {/* Add Patient Button */}
          <button 
            className="flex items-center justify-center gap-2 whitespace-nowrap"
            style={{
              padding: 'var(--spacing-3) var(--spacing-6)',
              background: '#FFFFFF',
              color: 'var(--text-primary)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              borderRadius: 'var(--radius-none)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-primary)';
              e.currentTarget.style.color = 'var(--brand-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Patient List - Detailed View */}
      {viewMode === "detailed" && (
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 'var(--radius-none)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(124, 103, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              }}
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                  {/* Avatar */}
                  <div 
                    style={{
                      width: 'clamp(48px, 10vw, 56px)',
                      height: 'clamp(48px, 10vw, 56px)',
                      background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                      borderRadius: 'var(--radius-none)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      flexShrink: 0
                    }}
                  >
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <h3 
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 700,
                          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {patient.name}
                      </h3>
                      <span 
                        style={{
                          padding: 'var(--spacing-1) var(--spacing-2)',
                          background: patient.status === "active" ? '#10B981' :
                                     patient.status === "alumni" ? '#3B82F6' : '#F59E0B',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'clamp(0.625rem, 1.3vw, 0.6875rem)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          borderRadius: 'var(--radius-none)'
                        }}
                      >
                        {patient.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2" style={{ fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)', color: 'var(--text-secondary)' }}>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" style={{ flexShrink: 0 }} />
                        <span className="truncate">{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" style={{ flexShrink: 0 }} />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" style={{ flexShrink: 0 }} />
                        <span className="truncate">{patient.therapist}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ flexShrink: 0 }} />
                        <span>Admitted: {patient.admissionDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  className="w-full lg:w-auto"
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-6)',
                    background: '#FFFFFF',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: 'var(--radius-none)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                    e.currentTarget.style.color = 'var(--brand-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Patient Grid - Overview View */}
      {viewMode === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 'var(--radius-none)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(124, 103, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              }}
            >
              <div className="text-center">
                {/* Avatar */}
                <div 
                  style={{
                    width: 'clamp(64px, 15vw, 72px)',
                    height: 'clamp(64px, 15vw, 72px)',
                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                    borderRadius: 'var(--radius-none)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
                    margin: '0 auto var(--spacing-3)'
                  }}
                >
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Name */}
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 700,
                    fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-2)'
                  }}
                >
                  {patient.name}
                </h3>

                {/* Status Badge */}
                <span 
                  style={{
                    display: 'inline-block',
                    padding: 'var(--spacing-1) var(--spacing-3)',
                    background: patient.status === "active" ? '#10B981' :
                               patient.status === "alumni" ? '#3B82F6' : '#F59E0B',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.625rem, 1.3vw, 0.6875rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRadius: 'var(--radius-none)',
                    marginBottom: 'var(--spacing-4)'
                  }}
                >
                  {patient.status}
                </span>

                {/* Info */}
                <div className="space-y-2 mb-4" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)', color: 'var(--text-secondary)' }}>
                  <div className="flex items-center justify-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">{patient.therapist}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{patient.admissionDate}</span>
                  </div>
                  <div 
                    className="pt-2 mt-2"
                    style={{ 
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
                      color: 'var(--brand-primary)'
                    }}
                  >
                    {patient.program}
                  </div>
                </div>

                {/* Button */}
                <button 
                  className="w-full"
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-4)',
                    background: '#FFFFFF',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: 'var(--radius-none)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                    e.currentTarget.style.color = 'var(--brand-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Therapists Content - Admin Only
function TherapistsContent() {
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Cognitive Behavioral Therapy",
      email: "sarah.chen@riverside.com",
      phone: "+1 (555) 123-4567",
      patients: 12,
      rate: 150,
      calendarSynced: true,
      availability: "available" as const
    },
    {
      id: 2,
      name: "Michael Torres",
      specialty: "Peer Support & Accountability",
      email: "m.torres@riverside.com",
      phone: "+1 (555) 234-5678",
      patients: 8,
      rate: 100,
      calendarSynced: true,
      availability: "available" as const
    },
    {
      id: 3,
      name: "Dr. Jessica Martinez",
      specialty: "Medication Management & Neuroscience",
      email: "j.martinez@riverside.com",
      phone: "+1 (555) 345-6789",
      patients: 15,
      rate: 200,
      calendarSynced: false,
      availability: "limited" as const
    },
    {
      id: 4,
      name: "Emma Richardson",
      specialty: "Holistic Integration & Life Design",
      email: "e.richardson@riverside.com",
      phone: "+1 (555) 456-7890",
      patients: 6,
      rate: 125,
      calendarSynced: true,
      availability: "available" as const
    }
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Section Header - Eyebrow + Headline LEFT, Description RIGHT */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-end">
        <div>
          {/* Eyebrow with Icon */}
          <div 
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
            style={{ 
              padding: 'var(--spacing-2) var(--spacing-4)',
              background: 'linear-gradient(135deg, rgba(157, 143, 255, 0.12), rgba(157, 143, 255, 0.08))',
              border: '1px solid rgba(157, 143, 255, 0.25)',
              borderRadius: 'var(--radius-none)'
            }}
          >
            <Heart className="w-3.5 h-3.5" style={{ color: '#9D8FFF' }} />
            <span
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: 'clamp(0.625rem, 1.4vw, 0.6875rem)',
                color: '#9D8FFF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Care Team
            </span>
          </div>
          
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            Therapists & Coaches
          </h2>
        </div>
        <div>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)'
            }}
          >
            Manage your clinical team, track availability, and coordinate patient assignments.
          </p>
        </div>
      </div>

      {/* Add Therapist Button */}
      <div className="flex justify-end">
        <button 
          className="flex items-center gap-2"
          style={{
            padding: 'var(--spacing-3) var(--spacing-6)',
            background: '#FFFFFF',
            color: 'var(--text-primary)',
            border: '2px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 'var(--radius-none)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--brand-primary)';
            e.currentTarget.style.color = 'var(--brand-primary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Plus className="w-4 h-4" />
          Add Therapist
        </button>
      </div>

      {/* Therapist List */}
      <div className="space-y-4">
        {therapists.map((therapist) => (
          <div 
            key={therapist.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: 'var(--radius-none)',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(157, 143, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
            }}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                {/* Avatar */}
                <div 
                  style={{
                    width: 'clamp(48px, 10vw, 56px)',
                    height: 'clamp(48px, 10vw, 56px)',
                    background: 'linear-gradient(135deg, #9D8FFF, #C49DC4)',
                    borderRadius: 'var(--radius-none)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    flexShrink: 0
                  }}
                >
                  {therapist.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Therapist Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 700,
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {therapist.name}
                    </h3>
                    {therapist.calendarSynced && (
                      <span 
                        style={{
                          padding: 'var(--spacing-1) var(--spacing-2)',
                          background: '#10B981',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'clamp(0.625rem, 1.3vw, 0.6875rem)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          borderRadius: 'var(--radius-none)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-1)'
                        }}
                      >
                        <Calendar className="w-3 h-3" />
                        Synced
                      </span>
                    )}
                  </div>

                  <div 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                      color: '#9D8FFF',
                      marginBottom: 'var(--spacing-3)'
                    }}
                  >
                    {therapist.specialty}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2" style={{ fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)', color: 'var(--text-secondary)' }}>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ flexShrink: 0 }} />
                      <span className="truncate">{therapist.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ flexShrink: 0 }} />
                      <span>{therapist.patients} active patients</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ flexShrink: 0 }} />
                      <span>{therapist.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" style={{ flexShrink: 0 }} />
                      <span>${therapist.rate}/hr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className="w-full lg:w-auto"
                style={{
                  padding: 'var(--spacing-2) var(--spacing-6)',
                  background: '#FFFFFF',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 'var(--radius-none)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#9D8FFF';
                  e.currentTarget.style.color = '#9D8FFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Alumni Content - Admin Only
function AlumniContent() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Section Header - Eyebrow + Headline LEFT, Description RIGHT */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-end">
        <div>
          {/* Eyebrow with Icon */}
          <div 
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
            style={{ 
              padding: 'var(--spacing-2) var(--spacing-4)',
              background: 'linear-gradient(135deg, rgba(196, 157, 196, 0.12), rgba(196, 157, 196, 0.08))',
              border: '1px solid rgba(196, 157, 196, 0.25)',
              borderRadius: 'var(--radius-none)'
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" style={{ color: '#C49DC4' }} />
            <span
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: 'clamp(0.625rem, 1.4vw, 0.6875rem)',
                color: '#C49DC4',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Community Management
            </span>
          </div>
          
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            Alumni Network
          </h2>
        </div>
        <div>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)'
            }}
          >
            Monitor alumni engagement, manage events, and support ongoing recovery connections.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Alumni", value: "127", icon: Users, color: '#C49DC4' },
          { label: "Active Members", value: "94", icon: Heart, color: '#10B981' },
          { label: "This Month Posts", value: "342", icon: MessageCircle, color: '#3B82F6' },
          { label: "Upcoming Events", value: "8", icon: Calendar, color: '#F59E0B' }
        ].map((stat, index) => (
          <div 
            key={index}
            style={{
              background: '#FFFFFF',
              border: `1px solid ${stat.color}33`,
              borderRadius: 'var(--radius-none)',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 20px ${stat.color}26`;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = `${stat.color}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = `${stat.color}33`;
            }}
          >
            <div 
              style={{
                width: 'clamp(40px, 10vw, 48px)',
                height: 'clamp(40px, 10vw, 48px)',
                background: `${stat.color}15`,
                borderRadius: 'var(--radius-none)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-3)'
              }}
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
            </div>
            <div 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-1)'
              }}
            >
              {stat.value}
            </div>
            <div 
              style={{ 
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Management Tools */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Manage Events",
            description: "Schedule alumni gatherings, workshops, and community meetups",
            icon: Calendar,
            color: '#C49DC4',
            buttonText: "View Calendar"
          },
          {
            title: "Message Board",
            description: "Monitor community discussions and moderate content",
            icon: MessageCircle,
            color: '#9D8FFF',
            buttonText: "Open Board"
          }
        ].map((tool, index) => (
          <div 
            key={index}
            style={{
              background: '#FFFFFF',
              border: `1px solid ${tool.color}33`,
              borderRadius: 'var(--radius-none)',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 24px ${tool.color}26`;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = `${tool.color}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = `${tool.color}33`;
            }}
          >
            <div 
              style={{
                width: 'clamp(48px, 11vw, 56px)',
                height: 'clamp(48px, 11vw, 56px)',
                background: `${tool.color}15`,
                borderRadius: 'var(--radius-none)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-4)'
              }}
            >
              <tool.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: tool.color }} />
            </div>
            <h3 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-2)'
              }}
            >
              {tool.title}
            </h3>
            <p 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-4)',
                lineHeight: 1.5
              }}
            >
              {tool.description}
            </p>
            <button 
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                color: tool.color,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                transition: 'gap 0.2s ease',
                padding: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.gap = 'var(--spacing-3)'}
              onMouseLeave={(e) => e.currentTarget.style.gap = 'var(--spacing-2)'}
            >
              {tool.buttonText}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Integrations Content - Admin Only
function IntegrationsContent({ view, setView }: { view: IntegrationView; setView: (v: IntegrationView) => void }) {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Section Header - Eyebrow + Headline LEFT, Description RIGHT */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-end">
        <div>
          {/* Eyebrow with Icon */}
          <div 
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
            style={{ 
              padding: 'var(--spacing-2) var(--spacing-4)',
              background: 'linear-gradient(135deg, rgba(168, 196, 225, 0.12), rgba(168, 196, 225, 0.08))',
              border: '1px solid rgba(168, 196, 225, 0.25)',
              borderRadius: 'var(--radius-none)'
            }}
          >
            <Plug className="w-3.5 h-3.5" style={{ color: '#A8C4E1' }} />
            <span
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: 'clamp(0.625rem, 1.4vw, 0.6875rem)',
                color: '#A8C4E1',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Connected Services
            </span>
          </div>
          
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            Integrations
          </h2>
        </div>
        <div>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)'
            }}
          >
            Connect your favorite tools for meetings, file storage, and calendar management.
          </p>
        </div>
      </div>

      {/* Connected Storage (like Navigate Resources) */}
      <div>
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          Connected Storage
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: "Dropbox", icon: Cloud, color: "#0061FF", description: "Treatment plans, discharge summaries, and care documents", connected: true },
            { name: "Google Drive", icon: HardDrive, color: "#4285F4", description: "Worksheets, journals, and recovery resources", connected: true },
            { name: "OneDrive", icon: Share2, color: "#0078D4", description: "Insurance forms and administrative documents", connected: true }
          ].map((storage, index) => (
            <div 
              key={index}
              style={{
                background: 'var(--glass-bg-light)',
                backdropFilter: 'var(--glass-blur-default)',
                border: `2px solid ${storage.color}33`,
                borderRadius: 'var(--radius-none)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--glass-bg-medium)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${storage.color}22`;
                e.currentTarget.style.borderColor = `${storage.color}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--glass-bg-light)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${storage.color}33`;
              }}
            >
              <div 
                style={{
                  width: 'clamp(40px, 10vw, 48px)',
                  height: 'clamp(40px, 10vw, 48px)',
                  background: `${storage.color}15`,
                  borderRadius: 'var(--radius-none)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                <storage.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: storage.color }} />
              </div>
              <h4 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)'
                }}
              >
                {storage.name}
              </h4>
              <p 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--spacing-4)',
                  lineHeight: 1.5
                }}
              >
                {storage.description}
              </p>
              <div className="flex items-center gap-2" style={{ fontSize: 'clamp(0.6875rem, 1.4vw, 0.75rem)' }}>
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    background: storage.connected ? '#10B981' : '#EF4444',
                    borderRadius: 'var(--radius-none)'
                  }}
                />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: storage.connected ? '#10B981' : '#EF4444' }}>
                  {storage.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Tools */}
      <div>
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          Meeting Platforms
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: "Zoom", icon: Video, color: "#2D8CFF", connected: true },
            { name: "Google Meet", icon: Video, color: "#00A67E", connected: false },
            { name: "Microsoft Teams", icon: Video, color: "#6264A7", connected: false }
          ].map((platform, index) => (
            <div 
              key={index}
              style={{
                background: '#FFFFFF',
                border: `1px solid ${platform.color}33`,
                borderRadius: 'var(--radius-none)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 24px ${platform.color}26`;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = `${platform.color}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `${platform.color}33`;
              }}
            >
              <div 
                style={{
                  width: 'clamp(48px, 11vw, 56px)',
                  height: 'clamp(48px, 11vw, 56px)',
                  background: `${platform.color}15`,
                  borderRadius: 'var(--radius-none)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                <platform.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: platform.color }} />
              </div>
              <h4 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                {platform.name}
              </h4>
              <button 
                style={{
                  width: '100%',
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  background: platform.connected ? '#FFFFFF' : platform.color,
                  color: platform.connected ? 'var(--text-primary)' : '#FFFFFF',
                  border: platform.connected ? '2px solid rgba(0, 0, 0, 0.1)' : 'none',
                  borderRadius: 'var(--radius-none)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (platform.connected) {
                    e.currentTarget.style.borderColor = '#EF4444';
                    e.currentTarget.style.color = '#EF4444';
                  } else {
                    e.currentTarget.style.opacity = '0.9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (platform.connected) {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  } else {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {platform.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Admin Content - Admin Only
function AdminContent() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Section Header - Eyebrow + Headline LEFT, Description RIGHT */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-end">
        <div>
          {/* Eyebrow with Icon */}
          <div 
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
            style={{ 
              padding: 'var(--spacing-2) var(--spacing-4)',
              background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.12), rgba(62, 43, 184, 0.08))',
              border: '1px solid rgba(62, 43, 184, 0.25)',
              borderRadius: 'var(--radius-none)'
            }}
          >
            <Settings className="w-3.5 h-3.5" style={{ color: '#3E2BB8' }} />
            <span
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: 'clamp(0.625rem, 1.4vw, 0.6875rem)',
                color: '#3E2BB8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Organization
            </span>
          </div>
          
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            Admin Settings
          </h2>
        </div>
        <div>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)'
            }}
          >
            Configure organization settings, security preferences, and platform features.
          </p>
        </div>
      </div>

      {/* Organization Settings */}
      <div 
        style={{
          background: '#FAFAFA',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          borderRadius: 'var(--radius-none)'
        }}
      >
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 600, 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          Organization Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            { label: "Organization Name", value: "Riverside Recovery Center", type: "text" },
            { label: "Contact Email", value: "admin@riverside.com", type: "email" },
            { label: "Phone Number", value: "+1 (555) 000-0000", type: "tel" },
            { label: "Team Size", value: "25-50 staff members", type: "text" }
          ].map((field, index) => (
            <div key={index}>
              <label 
                style={{ 
                  display: 'block',
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: 'clamp(0.8125rem, 1.6vw, 0.875rem)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)'
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                defaultValue={field.value}
                disabled
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3) var(--spacing-4)',
                  border: '2px solid rgba(0, 0, 0, 0.05)',
                  background: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 'var(--radius-none)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                  color: 'var(--text-secondary)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div 
        style={{
          background: '#FAFAFA',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          borderRadius: 'var(--radius-none)'
        }}
      >
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 600, 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          Security & Compliance
        </h3>

        <div className="space-y-4">
          {[
            { icon: Shield, label: "Two-Factor Authentication", description: "Require 2FA for all admin accounts", enabled: true },
            { icon: Lock, label: "Session Management", description: "Auto-logout after 30 minutes of inactivity", enabled: true },
            { icon: Eye, label: "Audit Logs", description: "Track all administrative actions and changes", enabled: true }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-4" style={{ paddingBottom: 'var(--spacing-4)', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div className="flex items-center gap-3 flex-1">
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(62, 43, 184, 0.1)',
                    borderRadius: 'var(--radius-none)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <item.icon className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                </div>
                <div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600,
                      fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {item.label}
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
                      color: 'var(--text-tertiary)'
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6" style={{ flexShrink: 0 }}>
                <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                <div 
                  className="w-full h-full bg-gray-200 peer-checked:bg-[#3E2BB8] transition-all cursor-pointer"
                  style={{ borderRadius: 'var(--radius-none)' }}
                ></div>
                <div 
                  className="absolute left-1 top-1 w-4 h-4 bg-white transition-transform peer-checked:translate-x-6"
                  style={{ borderRadius: 'var(--radius-none)' }}
                ></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
