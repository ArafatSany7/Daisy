import { Request, Response } from 'express';
import { prisma } from '../server';

export const getProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    // Assuming user id is attached to req by auth middleware
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name } = req.body;
    const user = await prisma.user.update({ 
      where: { id: userId },
      data: { name },
      select: { id: true, email: true, name: true, role: true }
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
