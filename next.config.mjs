/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com"
            },
            {
                hostname: "gravatar.com"
            },
            {
                hostname: "lh3.googleusercontent.com"
            }
        ]
    }
};

export default nextConfig;
