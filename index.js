import React, { useState, useEffect } from "react";
import apiClient from "../../spotify";
import "./trending.css";
import { useNavigate } from "react-router-dom";

export default function Trending() {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [audiobooks, setAudiobooks] = useState([]);
  const [genreSeeds, setGenreSeeds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedPlaylists();
    fetchNewReleases();
    fetchSimilarArtists();
    fetchAudiobooks();
    fetchGenreSeeds();
  }, []);

  const fetchFeaturedPlaylists = () => {
    apiClient.get(`/browse/featured-playlists`)
      .then((res) => {
        const playlists = res.data?.playlists.items.slice(0, 50);
        setFeaturedPlaylists(playlists);
      })
      .catch((err) => console.error(err));
  };

  const fetchNewReleases = () => {
    apiClient.get(`/browse/new-releases`)
      .then((res) => {
        const albums = res.data?.albums.items.slice(0, 50);
        setNewReleases(albums);
      })
      .catch((err) => console.error(err));
  };

  const fetchSimilarArtists = (artistID) => {
    apiClient.get(`/artists/${artistID}/related-artists`)
      .then((res) => {
        const artists = res.data?.artists.slice(0, 3);
        setSimilarArtists(artists);
      })
      .catch((err) => console.error(err));
  };

  const fetchAudiobooks = () => {
    apiClient.get(`/audiobooks`)
      .then((res) => {
        const books = res.data?.audiobooks.items.slice(0, 50);
        setAudiobooks(res.data?.audiobooks || []);
      })
      .catch((err) => console.error(err));
  };
  const genreImages = {
    "acoustic": "https://i.scdn.co/image/ab67616d0000b2736a94e318f049e7f2ad8772df",
    "afrobeat": "https://miro.medium.com/v2/resize:fit:735/1*Bn_1E170_IRQN9A8H_Xuzg.jpeg",
    "alt-rock" : "https://i.scdn.co/image/ab67706c0000da84e14c9bc884e59567dd24ead1",
    "alternative" : "https://soundplate.com/wp-content/uploads/alternative-spotify-playlist-jpg.jpg",
    "ambient" : "https://i.scdn.co/image/ab67706c0000da844a6bcd533d6875ebbd9ef888",
    "anime" : "https://image.tensorartassets.com/cdn-cgi/image/anim=true,w=2560,f=jpeg,q=85/posts/images/639026013623333777/49e808f5-d032-4b1f-a6ef-e9a28c51fa64.jpg",
    "black-metal" : "https://i.scdn.co/image/ab67706c0000da844839226974b891ddbdfe3292",
    "bluegrass" : "https://i.scdn.co/image/ab67616d00001e02c2f17ef35abb4c938d67fbb6",
    "blues" : "https://i.scdn.co/image/ab67616d00001e0284dbf6ee7a527938b98a0afc",
    "bossanova" : "https://i.scdn.co/image/ab67616100005174f87be64441104977eb833d0a",
    "brazil" : "https://i.scdn.co/image/ab67616d0000b27312c875f8975207127b65bcb0",
    "breakbeat" : "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84fcea780422b5bedf1bd645df",
    "british" : "https://i.scdn.co/image/ab67656300005f1f5b0630236a90adaecd62008b",
    "cantopop" : "https://i.scdn.co/image/ab67616d00001e02f8b1426a9cf1d1d883d3147f",
    "chicago-house" : "https://i.scdn.co/image/ab67616d00001e0252385d54dc7dd59720ba2f03",
    "children" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNUY0kgLNRIC8In33mIVJgJqmGah84jt4LMbGUJphPMg&s",
    "chill" : "https://i.scdn.co/image/ab67706c0000da84a75e9e508f98d4947ddcd5c7",
    "classical" : "https://i.scdn.co/image/ab67706f000000028bc55791c7c394b24c319877",
    "club" : "https://i.scdn.co/image/ab67706c0000da84d221f06cce5dcbdc25f9a81b",
    "comedy" : "https://i.scdn.co/image/ab67656300005f1f416d8e72329e9bb47d0477a2",

    // Add more genres and corresponding image URLs as needed
  };
  const fetchGenreSeeds = () => {
    apiClient.get(`/recommendations/available-genre-seeds`)
      .then((res) => {
        setGenreSeeds(res.data?.genres.slice(0,20) || []);
      })
      .catch((err) => console.error(err));
  };

  const handleItemClick = (item) => {
    console.log("Item clicked:", item);
    navigate("/player", { state: { id: item.id } });
  };

  return (
    <div className="screen-container">
      <div className="section">
        <h2>Featured Playlists</h2>
        <div className="grid">
          {featuredPlaylists.map((playlist, index) => (
            <div className="item" key={index} onClick={() => handleItemClick(playlist)}>
              <img src={playlist.images[0].url} alt={playlist.name} />
              <div className="item-details">
                <div className="item-name">{playlist.name}</div>
                <div className="item-owner">By {playlist.owner.display_name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>New Releases</h2>
        <div className="grid">
          {newReleases.map((album, index) => (
            <div className="item" key={index} onClick={() => handleItemClick(album)}>
              <img src={album.images[0].url} alt={album.name} />
              <div className="item-details">
                <div className="item-name">{album.name}</div>
                <div className="item-artists">
                  {album.artists.map((artist) => artist.name).join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Available Genres</h2>
        <div className="grid">
          {genreSeeds.map((genre, index) => (
            <div className="item" key={index} onClick={() => handleItemClick(genre)}>
              <img src={genreImages[genre]} alt={genre} />
              <div className="item-details">
                <div className="item-name">{genre}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className="section">
        <h2>Similar Artists</h2>
        <div className="grid">
          {similarArtists.map((artist, index) => (
            <div className="item" key={index} onClick={() => handleItemClick(artist)}>
              <img src={artist.images[0].url} alt={artist.name} />
              <div className="item-details">
                <div className="item-name">{artist.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Audiobooks</h2>
        <div className="grid">
          {audiobooks.map((book, index) => (
            <div className="item" key={index} onClick={() => handleItemClick(book)}>
              <img src={book.cover_image} alt={book.title} />
              <div className="item-details">
                <div className="item-name">{book.title}</div>
                <div className="item-author">{book.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
