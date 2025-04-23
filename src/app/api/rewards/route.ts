import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
    const filePath = path.join(process.cwd(), 'src', 'app', 'rewards', 'rewards.json');

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const rewards = JSON.parse(data);
        return NextResponse.json(rewards);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to load rewards' }, { status: 500 });
    }
}
//ฝากไว้ก่อน
// import axios from 'axios';
// const { data: rewards } = await axios.get('/api/rewards');
//console.log("rewards", rewards);
