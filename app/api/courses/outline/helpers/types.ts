export interface PredictResponse {
  choices: {
    delta: {
      content?: string
    }
  }[]
}
