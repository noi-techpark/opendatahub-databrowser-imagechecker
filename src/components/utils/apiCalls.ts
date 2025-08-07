import api from './api'
import type { Accommodation } from '../pages/Dataset/tableView/types'
export async function getAccomodations(): Promise<Accommodation[]> {
  const response = await api.get('/v1/Accommodation')
  return response.data
}
