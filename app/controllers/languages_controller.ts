import Language from '#models/language'
import { createLanguageValidator } from '#validators/language'
import type { HttpContext } from '@adonisjs/core/http'
import LanguagePolicy from '#policies/language_policy'

export default class LanguagesController {
  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, bouncer, response }: HttpContext) {
    // @ts-ignore
    if (await bouncer.with(LanguagePolicy).denies('create')) {
      logger.info('User tried to create a language without permission')
      response.status(403).json('Oopsie!')
    } else {
      const payload = await request.validateUsing(createLanguageValidator)
      // @ts-ignore
      const language = await Language.create(payload)
      logger.info('Language created')
      response.status(200).json("Done!")
    }
  }

  /**
   * Show individual record
   */
  async show({ logger, params, response }: HttpContext) {
    logger.info('Fetching language %s', params.id)
    response.status(200).json(await Language.findOrFail(params.id))
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ logger, params, request }: HttpContext) {
    const language = await Language.findOrFail(params.id)
    const payload = await request.validateUsing(createLanguageValidator)
    language.merge(payload)
    logger.info('Language updated')
    await language.save()
  }

  /**
   * Delete record
   */
  async destroy({ logger, params }: HttpContext) {
    const language = await Language.findOrFail(params.id)
    logger.info('Language %s deleted', language.id)
    await language.delete()
  }
}
