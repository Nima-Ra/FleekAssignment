import Array "mo:base/Array";
import Option "mo:base/Option";
import Cycles "mo:base/ExperimentalCycles";

shared(msg) actor class Service() {
  
  type Task = {
    url: Text;
  };

  var tasks: [Task] = [];
  var workers: [Principal] = [];

  public query func name() : async Text {
      return "HTTP POST Service";
  };

  public func post(url: Text) : async () {
    // Receive the fee from user:
    let fee = 500000000000;
    let accepted = Cycles.accept(fee);
    assert(accepted == fee);

    // Append the task.
    let task: Task = {url = url};
    tasks := Array.append(tasks, [task]);
  };

  public shared({caller}) func flush() : async [Task] {
    assert(isWorker(caller));
    let previous = tasks;
    tasks := [];
    return previous;
  };

  public shared ({caller}) func add_worker(worker: Principal): async () {
    assert(caller == msg.caller);
    workers := Array.append(workers, [worker]);
  };

  private func isWorker(c: Principal): Bool {
    let found = Array.find<Principal>(workers, func(p: Principal) { p == c });
    return Option.isSome(found);
  };
};

