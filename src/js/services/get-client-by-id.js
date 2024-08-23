import { apiConfig } from "./api-config";

export async function getClientById({ id }) {
  const response = await fetch(`${apiConfig.baseUrl}/clients/${id}`)
  const data = await response.json()

  return data
}