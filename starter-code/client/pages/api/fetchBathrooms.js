import { BathroomModel } from '../../../server/models/bathroom';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const bathrooms = await BathroomModel.findAll();
      res.status(200).json(bathrooms);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bathrooms' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}