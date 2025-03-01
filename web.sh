if [ ! -d "monorepo-cicd" ]; then
    echo "Creating monorepo-cicd directory..."
    mkdir mindsketch
fi

echo "Changing directory to mindsketch..."
cd mindsketch

echo "Pulling latest image from Docker Hub..."
docker pull abhoy21/mindsketch-web:${{ github.sha }} || {
    echo "Error: Failed to pull latest image from Docker Hub"
    exit 1
}

echo "Running docker container..."
docker run -d -p 8000:8000 --name web -e NODE_ENV=production -e NEXT_PUBLIC_HTTP_URL=${{secrets.NEXT_PUBLIC_HTTP_URL}} -e NEXT_PUBLIC_WS_URL=${{secrets.NEXT_PUBLIC_WS_URL}} abhoy21/mindsketch-web:${{ github.sha }} || {
    echo "Error: Failed to run docker container"
    exit 1
}
