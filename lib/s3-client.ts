// This function will call our API to get a presigned URL
export async function getPresignedUrl(key: string): Promise<{ url: string }> {
  try {
    const response = await fetch(`/api/presigned-url?key=${encodeURIComponent(key)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    if (!response.ok) {
      throw new Error("Failed to get presigned URL")
    }

    return response.json()
  } catch (error) {
    console.error("Error getting presigned URL:", error)
    throw error
  }
}
