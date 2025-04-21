import eqOperator from "./eq";
import gteOperator from "./gte";
import gtOperator from "./gt";
import ltOperator from "./lt";
import lteOperator from "./lte";
import neOperator from "./ne";
import andOperator from "./and";
import inOperator from "./in";
import orOperator from "./or";

// module.exports = {
//   $eq: require("./eq"),
//   $gte: require("./gte"),
//   $gt: require("./gt"),
//   $lt: require("./lt"),
//   $lte: require("./lte"),
//   $ne: require("./ne"),
//   $and: require("./and"),
//   $in: require("./in"),
//   $or: require("./or"),
// };

export default {
  $eq: eqOperator,
  $gte: gteOperator,
  $gt: gtOperator,
  $lt: ltOperator,
  $lte: lteOperator,
  $ne: neOperator,
  $and: andOperator,
  $in: inOperator,
  $or: orOperator,
};
