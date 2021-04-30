import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as assignment_idl, canisterId as assignment_id } from 'dfx-generated/assignment';

const agent = new HttpAgent();
const assignment = Actor.createActor(assignment_idl, { agent, canisterId: assignment_id });

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  const greeting = await assignment.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
