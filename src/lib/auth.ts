// src/lib/auth.ts
// This is a mock authentication utility for demonstration purposes.
// In a real application, this would integrate with a proper authentication system (e.g., NextAuth.js).

import { NextRequest } from 'next/server';



interface UserSession {

  id: number;

  name: string;

  email: string;

  isAdmin: boolean;

}



interface Session {

  user: UserSession;

  expires: string;

}



export async function getAuthSession(): Promise<Session | null> {



  if (typeof window === 'undefined') {



    return null;



  }







  const mockAuthToken = localStorage.getItem('mockAuthToken');



  if (mockAuthToken) {



    try {



      const user = JSON.parse(mockAuthToken) as UserSession;



      return {



        user: user,



        expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),



      };



    } catch (e) {



      console.error("Error parsing mockAuthToken from localStorage:", e);



      localStorage.removeItem('mockAuthToken');



      return null;



    }



  }



  return null;



}



export async function getServerAuthSession(req: NextRequest): Promise<Session | null> {



  const authorizationHeader = req.headers.get('authorization');



  if (!authorizationHeader) {



    return null;



  }







    const token = authorizationHeader.split(' ')[1]; // Assuming "Bearer TOKEN"







    console.log("getServerAuthSession: Raw token before parsing:", token);







    if (!token) {







      console.log("getServerAuthSession: No token found after split, returning null.");







      return null;







    }







  







    try {







      const user = JSON.parse(token) as UserSession;



    return {



      user: user,



      expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),



    };



  } catch (e) {



    console.error("Error parsing token from Authorization header:", e);



    return null;



  }



}
