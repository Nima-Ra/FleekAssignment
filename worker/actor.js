const fetch = require("node-fetch");
const { Crypto } = require("node-webcrypto-ossl");
const {
  HttpAgent,
  Principal,
  makeActorFactory,
  makeAuthTransform,
  makeNonceTransform,
} = require("@dfinity/agent");

global.btoa = require("btoa");
global.crypto = new Crypto();

const candid = ({ IDL }) => {
  const Task = IDL.Record({ 'url' : IDL.Text });

  const Service = IDL.Service({
    'add_worker' : IDL.Func([IDL.Principal], [], []),
    'flush' : IDL.Func([], [IDL.Vec(Task)], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'post' : IDL.Func([IDL.Text], [], []),
  });

  return Service;
};

const getActor = (host, canisterId, keypair) => {
  const canId = Principal.fromText(canisterId);

  const httpAgent = new HttpAgent({
    host: host,
    fetch,
    principal: Principal.selfAuthenticating(keypair.publicKey),
    credentials: null,
  });

  httpAgent.addTransform(makeNonceTransform());
  httpAgent.setAuthTransform(makeAuthTransform(keypair));

  let actor = makeActorFactory(candid)({
    canisterId: canId,
    agent: httpAgent,
  });
};

module.exports = {
  getActor
};

