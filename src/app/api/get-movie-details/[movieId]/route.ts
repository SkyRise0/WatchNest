import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET (request: NextRequest, { params }: { params: { movieId: number}}) {

    const movieId = params.movieId;

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + movieId,
        params: {language: 'en-US'},
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDE0M2JmZDE4MGJiYzI1ODlmNWI3YzEyMmJmOTMzZCIsIm5iZiI6MTczNzEzODA4OC41Mzc5OTk5LCJzdWIiOiI2NzhhOWZhOGRiZmU1MGFhM2QxZDJlNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.efG6KJ2Cu1OjSf60x0NFkcTQagg15m6GunALCt4NYDw'
        }
    };
  

      try {
        const response = await axios.request(options);
        return NextResponse.json(response.data, { status: 200 });
    
      } catch (error: any) {
    
        return NextResponse.json({ error: 'Failed to fetch movies', details: error.message }, { status: 500 });
      }
}