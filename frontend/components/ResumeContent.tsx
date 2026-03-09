'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface Profile {
  name: string;
  short_bio: string;
  email: string;
  phone: string;
  location: string;
  github_url?: string;
  linkedin_url?: string;
  photo_url?: string;
}

interface ResumeData {
  profile: Profile;
  work_experiences?: any[];
  projects?: any[];
  skills?: any;
  education?: any[];
  certifications?: any[];
  activities?: any[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ResumeContent() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/resume');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch resume data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('파일 크기가 너무 큽니다. 5MB 이하로 선택해주세요.');
      return;
    }

    setUploading(true);
    setUploadStatus('업로드 중...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/resume/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setData(prev => prev ? { ...prev, profile: { ...prev.profile, photo_url: response.data.photo_url } } : null);
        setUploadStatus('업로드 완료!');
        setTimeout(() => setUploadStatus(''), 3000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 실패했습니다.');
      setUploadStatus('업로드 실패');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          ⟳
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-8">데이터를 불러올 수 없습니다.</div>;
  }

  const { profile, work_experiences = [], projects = [], skills = {}, education = [], certifications = [] } = data;

  return (
    <motion.div
      className="resume-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        className="border-b-4 border-double border-win-blue pb-4 mb-6"
        variants={itemVariants}
      >
        <div className="flex flex-col items-center gap-6 flex-wrap sm:flex-row sm:justify-center">
          {/* Profile Photo */}
          <motion.div
            className="relative flex-shrink-0 group"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={profile.photo_url || '/default_profile.png'}
              alt={profile.name}
              className="w-32 h-32 object-cover border-4 border-t-white border-l-white border-b-win-gray-darker border-r-win-gray-darker bg-white"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-85 text-white text-xs text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer print-hide"
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ opacity: 1 }}
            >
              사진 변경
            </motion.div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </motion.div>

          {/* Header Text */}
          <motion.div className="text-center" variants={itemVariants}>
            <h1 className="font-pixel text-2xl text-win-blue mb-2 drop-shadow-sm">
              {profile.name}
            </h1>
            <p className="font-mono text-lg text-gray-700">
              {profile.short_bio}
            </p>
          </motion.div>
        </div>

        {uploadStatus && (
          <motion.div
            className="text-center text-sm mt-4 text-win-blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {uploadStatus}
          </motion.div>
        )}
      </motion.div>

      {/* Profile Info */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="grid grid-cols-1 gap-4">
          {profile.email && (
            <motion.div className="flex gap-4" whileHover={{ x: 5 }}>
              <span className="font-bold text-win-blue min-w-max">Email:</span>
              <a href={`mailto:${profile.email}`} className="text-win-link underline hover:text-red-600 break-all">
                {profile.email}
              </a>
            </motion.div>
          )}
          {profile.phone && (
            <motion.div className="flex gap-4" whileHover={{ x: 5 }}>
              <span className="font-bold text-win-blue min-w-max">Phone:</span>
              <span>{profile.phone}</span>
            </motion.div>
          )}
          {profile.location && (
            <motion.div className="flex gap-4" whileHover={{ x: 5 }}>
              <span className="font-bold text-win-blue min-w-max">Location:</span>
              <span>{profile.location}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Work Experience */}
      {work_experiences.length > 0 && (
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="font-pixel text-lg text-win-blue border-b-2 border-win-blue pb-2 mb-4">
            Work Experience
          </h2>
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {work_experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                className="pb-4 border-b border-gray-300"
                variants={itemVariants}
              >
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                  <h3 className="font-bold">{exp.company}</h3>
                  <span className="text-sm text-gray-600">{exp.period}</span>
                </div>
                <p className="font-bold text-gray-800 mb-2">{exp.position}</p>
                {exp.summary && (
                  <ul className="list-none pl-4 space-y-1 text-sm">
                    {Array.isArray(exp.summary) ? (
                      exp.summary.map((item: string, i: number) => (
                        <li key={i} className="before:content-['▸'] before:mr-2 before:text-win-blue">
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="before:content-['▸'] before:mr-2 before:text-win-blue">
                        {exp.summary}
                      </li>
                    )}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="font-pixel text-lg text-win-blue border-b-2 border-win-blue pb-2 mb-4">
            Projects
          </h2>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((proj, idx) => (
              <motion.div
                key={idx}
                className="bg-blue-50 border-2 border-gray-400 p-3 hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                  <h4 className="font-bold text-win-blue">{proj.title}</h4>
                  {proj.period && <span className="text-xs text-gray-600">{proj.period}</span>}
                </div>
                {proj.description && (
                  <p className="text-sm mb-2">{proj.description}</p>
                )}
                {proj.technologies && (
                  <div className="text-sm">
                    <strong className="text-gray-700">Tech:</strong>{' '}
                    <span className="text-win-blue">{proj.technologies.join(', ')}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Skills */}
      {Object.keys(skills).length > 0 && (
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="font-pixel text-lg text-win-blue border-b-2 border-win-blue pb-2 mb-4">
            Skills
          </h2>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(skills).map(([category, items]: [string, any]) => (
              <motion.div key={category} variants={itemVariants}>
                <h3 className="font-bold text-sm text-win-blue border-b border-gray-300 pb-1 mb-2">
                  {category}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {(Array.isArray(items) ? items : [items]).map((skill: string, i: number) => (
                    <motion.span
                      key={i}
                      className="bg-win-blue text-white px-2.5 py-0.5 text-xs shadow-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="font-pixel text-lg text-win-blue border-b-2 border-win-blue pb-2 mb-4">
            Education
          </h2>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {education.map((edu, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                  <h3 className="font-bold">{edu.school}</h3>
                  {edu.year && <span className="text-sm text-gray-600">{edu.year}</span>}
                </div>
                {edu.degree && <p className="text-sm text-gray-700">{edu.degree}</p>}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Footer */}
      <motion.div
        className="text-center text-xs text-gray-600 border-t border-gray-400 pt-4 mt-6"
        variants={itemVariants}
      >
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </motion.div>
  );
}
