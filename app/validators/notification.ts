import vine from '@vinejs/vine'

export const notificationJudgementValidator = vine.compile(
  vine.object({
    judgement: vine.string(),
  })
)
