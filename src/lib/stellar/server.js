import sdk from './sdk'
import networks from './networks'

export const defaultNetworkAddresses = {
  public: 'https://horizon.tokenvault.io',
  test: 'https://horizon.tokenvault.io',
  local: 'https://horizon.tokenvault.io',
}

/**
 * Wrap the stellar-sdk Server hiding setup of horizon addresses and adding
 * some helper functions. These helpers are more easily mocked for testing then
 * direct use of sdk fluent api.
 */
class WrappedServer extends sdk.Server {
  constructor(networkType, networkAddress, storage) {
    if (networkType === networks.public) sdk.Network.usePublicNetwork()
    else if (networkType === networks.test) sdk.Network.useTestNetwork()

    try {
      // allowHttp: public/test use HTTPS; local can use HTTP
      super(networkAddress, {allowHttp: true})
    } catch(err) {
      storage.removeItem('networkAddress')
      window.location.href = `/error/insecure-horizon-server/?${networkAddress}`
    };
  }

  //
  // Horizon url resolvers
  //

  accountURL = id => `${this.serverURL}accounts/${id}`
  effectURL = id => `${this.serverURL}operations/${id}/effects`
  ledgerURL = id => `${this.serverURL}ledgers/${id}`
  opURL = id => `${this.serverURL}operations/${id}`
  txURL = id => `${this.serverURL}transactions/${id}`
}

const Server = (...args)=> new WrappedServer(...args)

export default Server
