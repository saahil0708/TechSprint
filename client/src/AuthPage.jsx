import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Divider,
    Alert,
    IconButton,
    InputAdornment,
    CircularProgress,
    Link
} from '@mui/material';
import {
    Google,
    Facebook,
    GitHub,
    Visibility,
    VisibilityOff,
    Security,
    Fingerprint,
    ArrowForward
} from '@mui/icons-material';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, register, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
            </div>

            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={0}
                        className="p-8 rounded-2xl shadow-xl border border-gray-100 bg-white/90 backdrop-blur-sm"
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Security className="w-10 h-10 text-blue-600" />
                                <Typography variant="h4" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    DeepTrace AI
                                </Typography>
                            </div>
                            <Typography variant="h5" className="font-bold text-gray-900">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className="mt-2">
                                {isLogin
                                    ? 'Sign in to protect your digital identity'
                                    : 'Join us to secure your photos and digital assets'
                                }
                            </Typography>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <Alert severity="error" className="mb-6 rounded-lg" onClose={() => setError('')}>
                                {error}
                            </Alert>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                variant="outlined"
                                className="bg-white"
                                InputProps={{
                                    className: 'rounded-lg'
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                variant="outlined"
                                className="bg-white"
                                inputProps={{
                                    minLength: 6
                                }}
                                InputProps={{
                                    className: 'rounded-lg',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {!isLogin && (
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    className="bg-white"
                                    InputProps={{
                                        className: 'rounded-lg'
                                    }}
                                />
                            )}

                            {isLogin && (
                                <div className="text-right">
                                    <Link
                                        href="#"
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : isLogin ? (
                                    'Sign In'
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <Divider className="my-8 mt-5">
                            <Typography variant="body2" color="textSecondary" className="px-4">
                                Or continue with
                            </Typography>
                        </Divider>

                        {/* Social Login */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <Button
                                variant="outlined"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg py-3"
                                startIcon={<Google className="text-blue-600" />}
                            >
                                <span className="hidden sm:inline">Google</span>
                            </Button>

                            <Button
                                variant="outlined"
                                disabled
                                className="border-gray-300 hover:border-purple-500 hover:bg-purple-50 rounded-lg py-3"
                                startIcon={<Facebook className="text-purple-600" />}
                            >
                                <span className="hidden sm:inline">Facebook</span>
                            </Button>

                            <Button
                                variant="outlined"
                                disabled
                                className="border-gray-300 hover:border-gray-800 hover:bg-gray-100 rounded-lg py-3"
                                startIcon={<GitHub className="text-gray-800" />}
                            >
                                <span className="hidden sm:inline">GitHub</span>
                            </Button>
                        </div>

                        {/* Switch Mode */}
                        <div className="text-center">
                            <Typography variant="body2" color="textSecondary">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <Button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-blue-600 hover:text-blue-800 font-semibold p-0 min-w-0"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </Button>
                            </Typography>
                        </div>

                        {/* Security Note */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-start gap-3">
                                <Fingerprint className="w-5 h-5 text-green-600 mt-0.5" />
                                <Typography variant="caption" color="textSecondary">
                                    Your security is our priority. All data is encrypted and protected with enterprise-grade security.
                                </Typography>
                            </div>
                        </div>
                    </Paper>

                    {/* Benefits Section (Only on Sign Up) */}
                    {!isLogin && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8"
                        >
                            {/* <Paper className="p-6 rounded-2xl shadow-lg border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
                <Typography variant="h6" className="font-bold text-gray-900 mb-3">
                  🎁 Free Account Benefits
                </Typography>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowForward className="w-4 h-4 text-green-600" />
                    <Typography variant="body2">Protect up to 10 images</Typography>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowForward className="w-4 h-4 text-green-600" />
                    <Typography variant="body2">Real-time monitoring</Typography>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowForward className="w-4 h-4 text-green-600" />
                    <Typography variant="body2">Basic deepfake detection</Typography>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowForward className="w-4 h-4 text-green-600" />
                    <Typography variant="body2">Email alerts</Typography>
                  </li>
                </ul>
              </Paper> */}
                        </motion.div>
                    )}
                </motion.div>
            </Container>
        </div>
    );
};

export default AuthPage;