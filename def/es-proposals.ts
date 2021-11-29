import { Fork } from "../types";
import typesPlugin from "../lib/types";
import sharedPlugin from "../lib/shared";
import es2022Def from "./es2022";

export default function (fork: Fork) {
  fork.use(es2022Def);

  const types = fork.use(typesPlugin);
  const Type = types.Type;
  const def = types.Type.def;
  const or = Type.or;

  const shared = fork.use(sharedPlugin);
  const defaults = shared.defaults;

  def("AwaitExpression")
    .build("argument", "all")
    .field("argument", or(def("Expression"), null))
    .field("all", Boolean, defaults["false"]);

  // Decorators
  def("Decorator")
    .bases("Node")
    .build("expression")
    .field("expression", def("Expression"));

  def("Property")
    .field("decorators",
           or([def("Decorator")], null),
           defaults["null"]);

  def("MethodDefinition")
    .field("decorators",
           or([def("Decorator")], null),
           defaults["null"]);

  // Private names
  def("PrivateName")
    .bases("Expression", "Pattern")
    .build("id")
    .field("id", def("Identifier"));

  def("ClassPrivateProperty")
    .bases("ClassProperty")
    .build("key", "value")
    .field("key", def("PrivateName"))
    .field("value", or(def("Expression"), null), defaults["null"]);
};
