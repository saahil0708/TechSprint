import React from 'react';
import {
  Security, Lock, Visibility, CheckCircle, Warning, Memory, Public, ArrowForward,
  Fingerprint, CloudUpload, Search, VerifiedUser, Notifications, Code, Shield
} from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Paper,
  alpha,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <Container maxWidth="xl">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Security className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DeepTrace AI
              </span>
            </div>
            <Stack direction="row" spacing={2} className="items-center">
              <Button 
                variant="text" 
                onClick={() => navigate('/auth')}
                className="text-gray-600 hover:text-blue-600"
              >
                Log In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/auth')}
                endIcon={<ArrowForward />}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Protected
              </Button>
            </Stack>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
        <Container maxWidth="lg" className="relative">
          <div className="py-20 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Chip
                icon={<VerifiedUser />}
                label="New: Real-time Monitoring Released"
                className="mb-8 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200 shadow-sm"
              />
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block text-gray-900">Loss of Control?</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Take it Back.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Personal photos are stolen every day for deepfakes and identity theft. 
                <span className="font-semibold text-blue-600"> DeepTrace AI </span>
                embeds invisible digital fingerprints to track and alert you instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg font-semibold"
                >
                  Secure My Photos
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg transition-all duration-300 text-lg font-semibold"
                >
                  View Live Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-purple-50">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-blue-600 mb-3">2.5M+</div>
              <div className="text-lg text-gray-600 font-medium">Deepfake videos generated daily</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-red-500 mb-3">0%</div>
              <div className="text-lg text-gray-600 font-medium">Protection on standard platforms</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-green-600 mb-3">Instant</div>
              <div className="text-lg text-gray-600 font-medium">Alerts when misuse is detected</div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seamless protection in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Upload', desc: 'User uploads their photo to the secure platform.', icon: <CloudUpload className="w-12 h-12" />, color: 'from-blue-500 to-cyan-500' },
              { number: '02', title: 'Embed', desc: 'Encrypted invisible fingerprint is embedded.', icon: <Fingerprint className="w-12 h-12" />, color: 'from-purple-500 to-pink-500' },
              { number: '03', title: 'Register', desc: 'Ownership is securely registered in database.', icon: <VerifiedUser className="w-12 h-12" />, color: 'from-green-500 to-teal-500' },
              { number: '04', title: 'Monitor', desc: 'AI monitors misuse and sends real-time alerts.', icon: <Search className="w-12 h-12" />, color: 'from-orange-500 to-red-500' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto text-white shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-300 mb-4 group-hover:text-blue-400 transition-colors">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powered by Google Technologies (Vision API, Vertex AI) and designed for owner-centric protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, title: 'Invisible Fingerprinting', desc: 'Undetectable watermarks embedded in every image for ownership tracking.', color: 'bg-blue-100 text-blue-600' },
              { icon: <Visibility className="w-8 h-8" />, title: 'Deepfake Detection', desc: 'Advanced AI algorithms identify manipulated images and synthetic media.', color: 'bg-purple-100 text-purple-600' },
              { icon: <Public className="w-8 h-8" />, title: 'Real-Time Alerts', desc: 'Instant notifications when misuse is detected anywhere online.', color: 'bg-green-100 text-green-600' },
              { icon: <Memory className="w-8 h-8" />, title: 'TensorFlow Powered', desc: 'Deep learning models trained for precise facial matching and likeness protection.', color: 'bg-orange-100 text-orange-600' },
              { icon: <Warning className="w-8 h-8" />, title: 'Evidence Reports', desc: 'Comprehensive misuse documentation for legal action and authorities.', color: 'bg-red-100 text-red-600' },
              { icon: <Lock className="w-8 h-8" />, title: 'Blockchain Ready', desc: 'Future-proof immutable ownership records using distributed ledger technology.', color: 'bg-teal-100 text-teal-600' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full group hover:border-blue-200">
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 shadow-sm`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Powered By</h2>
            <p className="text-gray-600">Industry-leading technologies for maximum security</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {['Google Vision API', 'Vertex AI', 'TensorFlow', 'React'].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Code className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <span className="font-semibold text-gray-800">{tech}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Team Tech Kaiser</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building the future of digital identity protection
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Yash Yadav', role: 'Team Lead', initials: 'YY' },
              { name: 'Saahil Kumar Paul', role: 'Full Stack', initials: 'SP' },
              { name: 'Ajay Dinodiya', role: 'AI Engineer', initials: 'AD' },
              { name: 'Udit Singh', role: 'Security Expert', initials: 'US' },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300 border-4 border-white">
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {member.role}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Container maxWidth="lg">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Protect Your Digital Identity?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands who have taken control back with DeepTrace AI
            </p>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/auth')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg font-bold"
            >
              Start Free Trial
            </Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Security className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DeepTrace AI
              </span>
            </div>
            <div className="text-gray-600 text-center md:text-right">
              <p className="text-sm">© 2024 DeepTrace AI. All rights reserved.</p>
              <p className="text-sm mt-1">Protecting digital identities worldwide</p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;