if [ ! -d "monorepo-cicd" ]; then
    echo "Creating monorepo-cicd directory..."
    mkdir mindsketch
fi

echo "Changing directory to mindsketch..."
cd mindsketch

echo "Pulling latest image from Docker Hub..."
docker pull abhoy21/mindsketch-http-server:${{ github.sha }} || {
    echo "Error: Failed to pull latest image from Docker Hub"
    exit 1
}

echo "Running docker container..."
docker run -d -p 8000:8000 --name http-server -e NODE_ENV=production -e DATABASE_URL=${{ secrets.DATABASE_URL }} -e JWT_SECRET=${{ secrets.JWT_SECRET }} -e GEMINI_API_KEY=${{ secrets.GEMINI_API_KEY }} -e ACCESS_TOKEN_EXPIRES_IN=${{ secrets.ACCESS_TOKEN_EXPIRES_IN }} -e REFRESH_TOKEN_EXPIRES_IN=${{ secrets.REFRESH_TOKEN_EXPIRES_IN }} abhoy21/mindsketch-http-server:${{ github.sha }} || {
    echo "Error: Failed to run docker container"
    exit 1
}
