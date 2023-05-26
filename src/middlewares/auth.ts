import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const authMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const session = await getSession({ req });

  if (!session) {
    // User is not authenticated, redirect to the login page
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  // User is authenticated, allow further access
  return next();
};

export default authMiddleware;