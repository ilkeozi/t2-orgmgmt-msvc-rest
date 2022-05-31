/**
 * Logs execution duration of a method.
 * TODO: Extend to log externally.
 * @returns Function to be executed.
 */
export function logMetrics() {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
      const method = descriptor.value
      descriptor.value = async function () {
        const startTime = new Date(Date.now())
        await method.apply(this);
        const endTime = new Date(Date.now())
        console.log(`${name} duration=${endTime.getTime() - startTime.getTime()} ms to complete.`
        )
      }
    }
  }