"use server";

import { NextRequest, NextResponse } from "next/server";

import Auth from '../../auth.ts';
//import Database from '../../db.ts';

export async function POST(request: NextRequest) {
  const auth = new Auth();
  return auth.login(request);
}