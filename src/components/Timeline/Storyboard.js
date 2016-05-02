/**
 * Created by Jens.Elstner on 02/05/2016.
 */

function sq(val) {
  return val * val;
}

function quadraticBezierL(p0, p1, p2, time) {
  return sq(1 - time) * p0 + 2 * (1 - time) * time * p1 + sq(time) * p2;
}

function quadraticBezier(p0, p1, p2, time) {
  return {
    x: quadraticBezierL(p0.x, p1.x, p2.x, time),
    y: quadraticBezierL(p0.y, p1.y, p2.y, time),
  };
}

function cubicBezier(p0, p1, p2, p3, time) {
  const left = quadraticBezier(p0, p1, p2, time);
  const right = quadraticBezier(p1, p2, p3, time);
  return {
    x: (1 - time) * left.x + time * right.x,
    y: (1 - time) * left.y + time * right.y,
  };
}

/**
 * Get the cubic bezier points for the line from index to index + 1
 * @param points
 * @param index
 */
function getCubicPoints(points, index) {
  if (index < 0) {
    return [points[0], points[0]];
  }
  if (index >= points.length) {
    return [points[points.length - 1], points[points.length - 1]];
  }

  const prev = points[index > 0 ? index - 1 : index];
  const cur = points[index];
  const nextIndex = index < (points.length - 1) ? index + 1 : index;
  const next = points[nextIndex];
  const nextNext = points[index < (points.length - 2) ? index + 2 : nextIndex];

  // calculate left and right vectors
  const left = {
    x: (next.x - prev.x),
    y: (next.y - prev.y),
  };
  const leftLen = Math.sqrt(left.x * left.x + left.y * left.y);

  const right = {
    x: (nextNext.x - cur.x),
    y: (nextNext.y - cur.y),
  };
  const rightLen = Math.sqrt(right.x * right.x + right.y * right.y);

  // calculate points
  const dist = 1.5;
  const dx = Math.abs(next.x - cur.x) / dist;
  const dy = Math.abs(next.y - cur.y) / dist;

  const p1 = {
    x: cur.x + (left.x / leftLen) * dx,
    y: cur.y + (left.y / leftLen) * dy,
  };
  const p2 = {
    x: next.x - (right.x / rightLen) * dx,
    y: next.y - (right.y / rightLen) * dy,
  };

  return [p1, p2];
}

export {
  cubicBezier,
  getCubicPoints,
};
