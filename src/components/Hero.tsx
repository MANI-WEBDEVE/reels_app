'use client'
import axios from 'axios';
// HomePage.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components for the page layout
const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const VideoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  padding: 1rem;
`;

const VideoTitle = styled.h3`
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const VideoDescription = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
  margin: 0;
`;

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch videos using axios
    const fetchVideos = async () => {
      try {
        // Fetch videos using axios
        const { data } = await axios.get('/api/videos');
        setVideos(data.data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <Title>Loading...</Title>
        </Header>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>Featured Videos</Title>
      </Header>
      <VideoGrid>
        {videos.map((video) => (
          <VideoCard key={video._id}>
            <VideoThumbnail src={video.thumbnailUrl} alt={video.title} />
            <VideoInfo>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoDescription>{video.description}</VideoDescription>
            </VideoInfo>
          </VideoCard>
        ))}
      </VideoGrid>
    </PageContainer>
  );
};

export default HomePage;