import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import adminRoutes from './route.js';
import clodinary from 'cloudinary';

dotenv.config();
const app = express();

    clodinary.v2.config({
        cloud_name: process.env.Cloud_Name,
        api_key: process.env.Cloud_Api_Key,
        api_secret: process.env.Cloud_Api_Secret
    });
async function initDB() {
  try {
    await sql `
        CREATE TABLE IF NOT EXISTS albums(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          thumbnail VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
    await sql`
        CREATE TABLE IF NOT EXISTS songs(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          thumbnail VARCHAR(255),
          audio VARCHAR(255) NOT NULL,
          album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;



    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
app.use("/api/v1", adminRoutes);


const PORT = process.env.PORT || 3000;
initDB().then(() => { 
app.listen(PORT, () => {
  console.log(`Admin service is running on port ${PORT}`);
});
});