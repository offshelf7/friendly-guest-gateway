
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import BlurImage from '@/components/ui/BlurImage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, email, password });
    // Handle login/signup logic here
  };

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto p-4 flex flex-col md:flex-row h-screen items-center">
        {/* Logo at the top */}
        <div className="absolute top-8 left-8">
          <img 
            src="/lovable-uploads/85d6b5b3-e2d3-4ed3-9081-ffd2083c941d.png" 
            alt="Royal Hotel Logo" 
            className="h-12"
          />
        </div>

        {/* Left Section - Login Form */}
        <Card className="w-full md:w-1/2 lg:w-2/5 p-8 bg-gray-50 rounded-lg shadow-none">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome to Royal Hotel</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Sign up</h3>
              </div>
              
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Sign up
              </Button>

              <div className="text-center text-sm mt-4">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              </div>

              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 flex-grow mr-3"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="border-t border-gray-300 flex-grow ml-3"></div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" className="w-1/2 flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" className="w-1/2 flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                  </svg>
                  Apple
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Right Section - Hotel Showcase */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 p-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="overflow-hidden rounded-lg">
              <BlurImage 
                src="/lovable-uploads/85d6b5b3-e2d3-4ed3-9081-ffd2083c941d.png" 
                alt="Hotel Pool"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <BlurImage 
                  src="/lovable-uploads/85d6b5b3-e2d3-4ed3-9081-ffd2083c941d.png" 
                  alt="Hotel Lobby"
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <BlurImage 
                  src="/lovable-uploads/85d6b5b3-e2d3-4ed3-9081-ffd2083c941d.png" 
                  alt="Hotel Room"
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold mb-2">Find Your Perfect Stay and Book with Confidence</h3>
              <p className="text-gray-600">
                Elevate your travel experience with our seamless booking platform—explore curated hotels, compare options, and secure the ideal room for your journey.
              </p>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
