import Flow from '@/models/flow.js';
import logger from '@/helpers/logger.js';
import handlerSync from '@/helpers/webhook-handler-sync.js';

export default async (request, response) => {
  const computedRequestPayload = {
    headers: request.headers,
    body: request.body,
    query: request.query,
    params: request.params,
  };

  logger.debug(`Handling incoming webhook request at ${request.originalUrl}.`);
  logger.debug(JSON.stringify(computedRequestPayload, null, 2));

  const flowId = request.params.flowId;
  const flow = await Flow.query().findById(flowId).throwIfNotFound();
  const triggerStep = await flow.getTriggerStep();

  if (triggerStep.appKey !== 'webhook' && triggerStep.appKey !== 'forms') {
    const connection = await triggerStep.$relatedQuery('connection');

    if (!(await connection.verifyWebhook(request))) {
      return response.sendStatus(401);
    }
  }

  await handlerSync(flowId, request, response);
};
