import defineTrigger from '../../../../helpers/define-trigger.js';

export default defineTrigger({
  name: 'New todos',
  key: 'newTodos',
  pollInterval: 15,
  description: 'Triggers when a new todo is created.',

  async run($) {
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    do {
      const params = {
        operation: 'query',
        sessionName: $.auth.data.sessionName,
        query: `SELECT * FROM Calendar ORDER BY createdtime DESC LIMIT ${offset}, ${limit};`,
      };

      const { data } = await $.http.get('/webservice.php', {
        params,
      });
      offset = limit + offset;

      if (!data.result?.length || data.result.length < limit) {
        hasMore = false;
      }

      for (const item of data.result) {
        $.pushTriggerItem({
          raw: item,
          meta: {
            internalId: item.id,
          },
        });
      }
    } while (hasMore);
  },
});
