import { EventDispatcher, Vector2 } from "three";

import {
  Configuration,
  configWallHeight,
  cornerTolerance,
} from "../core/configuration.js";
import { WallTypes } from "../core/constants.js";
import {
  EVENT_ACTION,
  EVENT_DELETED,
  EVENT_MOVED,
  EVENT_CORNER_ATTRIBUTES_CHANGED,
} from "../core/events.js";
import { Utils } from "../core/utils.js";
//import {Dimensioning} from '../core/dimensioning.js';

/**
 * Corners are used to define Walls.
 */
export class Corner extends EventDispatcher {
  /** Constructs a corner.
   * @param {Floorplan} floorplan The associated model floorplan.
   * @param {Number} x X coordinate.
   * @param {Number} y Y coordinate.
   * @param {String} id An optional unique id. If not set, created internally.
   */
  constructor(floorplan, x, y, id) {
    super();
    /**
     * @property {String} id The id of this corner. Autogenerated the first time
     * @type {String}
     **/
    this.id = id || Utils.guide();
    /** @property {Array} wallStarts Array of walls that are start walls
     * @type {Array}
     **/
    this.wallStarts = [];
    /** @property {Array} wallEnds Array of walls that are end walls
     * @type {Array}
     **/
    this.wallEnds = [];
    /**
     * @deprecated Not in use. The EventDispatcher from threejs is used for emit and listen events
     **/
    this.moved_callbacks = null;
    /**
     * @deprecated Not in use. The EventDispatcher from threejs is used for emit and listen events
     **/
    this.deleted_callbacks = null;
    /**
     * @deprecated Not in use. The EventDispatcher from threejs is used for emit and listen events
     **/
    this.action_callbacks = null;
    /**
     * @property {Floorplan} floorplan Reference to the model floorplan
     * @type {Floorplan}
     **/
    this.floorplan = floorplan;
    /**
     * @property {Number} x The position in x dimension
     * @type {Number}
     **/
    this._x = x;
    /**
     * @property {Number} y The position in y dimension
     * @type {Number}
     **/
    this._y = y;

    /**
     * @property {Vector2} co The position as Vector2
     * @type {Vector2}
     * @see https://threejs.org/docs/#api/en/math/Vector2
     **/
    this._co = new Vector2(this._x, this._y);

    /**
     * @property {Number} _elevation The elevation at this corner
     * @type {Number}
     **/
    this._elevation = Configuration.getNumericValue(configWallHeight);
    /**
     * @property {Array} attachedRooms Array of rooms that have walls using this corner
     * @type {Array}
     **/
    this.attachedRooms = [];

    this.__hasBeenRemoved = false;

    this._angles = [];
    this._angleDirections = [];
    this._startAngles = [];
    this._endAngles = [];
    this._cyclicNeighbors = [];
    /**
     * @property {Boolean} _hasChanged A flag to indicate if something has changed about this corner
     * @type {Boolean}
     **/
    this._hasChanged = false;

    this.__isLocked = false;
  }

  set isLocked(flag) {
    this.__isLocked = flag;
  }

  get isLocked() {
    return this.__isLocked;
  }

  get uuid() {
    return this.id;
  }

  get startAngles() {
    return this._startAngles;
  }

  get endAngles() {
    return this._endAngles;
  }

  get angles() {
    return this._angles;
  }

  get angleDirections() {
    return this._angleDirections;
  }

  get location() {
    return this._co;
  }

  set location(xy) {
    this._co.x = xy.x;
    this._co.y = xy.y;
    this.x = xy.x;
    this.y = xy.y;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    let oldvalue = this._x;
    if (Math.abs(value - this._x) > 1e-6) {
      this._hasChanged = true;
    }
    this._x = value;
    if (this._hasChanged) {
      this._co.x = this._x;
      this.updateAttachedRooms();
      //			this.floorplan.update(false);
      this.dispatchEvent({
        type: EVENT_CORNER_ATTRIBUTES_CHANGED,
        item: this,
        info: { from: oldvalue, to: this._x },
      });
    }
  }

  get y() {
    return this._y;
  }

  set y(value) {
    let oldvalue = this._y;
    if (Math.abs(value - this._y) > 1e-6) {
      this._hasChanged = true;
    }
    this._y = value;
    if (this._hasChanged) {
      this._co.y = this._y;
      this.updateAttachedRooms();
      //			this.floorplan.update(false);
      this.dispatchEvent({
        type: EVENT_CORNER_ATTRIBUTES_CHANGED,
        item: this,
        info: { from: oldvalue, to: this._y },
      });
    }
  }

  /** @type {Number} elevation The elevation value at this corner*/
  set elevation(value) {
    let oldvalue = this._elevation;
    if (value - this._elevation > 1e-6) {
      this._hasChanged = true;
    }
    this._elevation = Number(value); //Dimensioning.cmFromMeasureRaw(Number(value));
    if (this._hasChanged) {
      this.dispatchEvent({
        type: EVENT_CORNER_ATTRIBUTES_CHANGED,
        item: this,
        info: { from: oldvalue, to: this._elevation },
      });
    }
  }

  /** @type {Number} elevation The elevation value at this corner*/
  get elevation() {
    return this._elevation;
  }

  /**
   * @param {Room} room - The room that should be attached to this corner
   * @return {void}
   */
  attachRoom(room) {
    if (room) {
      this.attachedRooms.push(room);
    }
  }

  /**
   * @return {Room[]} Array of rooms attached to this corner
   */
  getAttachedRooms() {
    return this.attachedRooms;
  }

  /**
   * @return {void} Clear all the rooms attached to this corner
   */
  clearAttachedRooms() {
    this.attachedRooms = [];
  }

  /** Add function to moved callbacks.
   * @param func The function to be added.
   */
  fireOnMove(func) {
    this.moved_callbacks.add(func);
  }

  /** Add function to deleted callbacks.
   * @param func The function to be added.
   */
  fireOnDelete(func) {
    this.deleted_callbacks.add(func);
  }

  /** Add function to action callbacks.
   * @param func The function to be added.
   */
  fireOnAction(func) {
    this.action_callbacks.add(func);
  }

  fireAction(action) {
    this.dispatchEvent({ type: EVENT_ACTION, item: this, action: action });
    //      this.action_callbacks.fire(action)
  }

  /**
   * @returns
   * @deprecated
   */
  getX() {
    return this.x;
  }

  /**
   * @returns
   * @deprecated
   */
  getY() {
    return this.y;
  }

  /**
   *	@param {Number} tolerance - The tolerance value within which it will snap to adjacent corners
   *  @return {Object} snapped Contains keys x and y with true/false values
   *  @description The object with x and y that are boolean values to indicate if the snap happens in x and y
   */
  snapToAxis(tolerance) {
    // try to snap this corner to an axis
    let snapped = { x: false, y: false };
    let scope = this;

    this.adjacentCorners().forEach((corner) => {
      if (Math.abs(corner.x - scope.x) < tolerance) {
        scope.x = corner.x;
        snapped.x = true;
      }
      if (Math.abs(corner.y - scope.y) < tolerance) {
        scope.y = corner.y;
        snapped.y = true;
      }
    });
    return snapped;
  }

  /** Moves corner to new position.
   * @param {Number} newX The new x position.
   * @param {Number} newY The new y position.
   */
  move(newX, newY, mergeWithIntersections = false) {
    //		this.x = newX;
    //		this.y = newY;
    this._x = newX;
    this._y = newY;
    this._co.x = newX;
    this._co.y = newY;

    if (mergeWithIntersections) {
      //The below line is crashing after makign the changes for curved walls
      //While release v1.0.0 is stable even with this line enabled
      this.mergeWithIntersected();
      if (this.floorplan.rooms.length < 10) {
        this.updateAttachedRooms(true);
      }
    }

    // this.wallStarts.forEach((wall) => {
    //     wall.fireMoved();
    // });

    // this.wallEnds.forEach((wall) => {
    //     wall.fireMoved();
    // });
    this.dispatchEvent({
      type: EVENT_MOVED,
      item: this,
      position: new Vector2(newX, newY),
    });
  }

  /** Moves corner relatively to new position.
   * @param {Number} dx The delta x.
   * @param {Number} dy The delta y.
   */
  relativeMove(dx, dy) {
    this.move(this.x + dx, this.y + dy);
  }

  /**
   * Dispatches an event when removed from the floorplan({@link Floorplan}) instance. The event object contains reference to this {@link Corner} instance as item.
   * @example
   * let corner = new Corner(floorplan, 0, 0);
   * function cornerRemoved(e) { console.log('I WAS REMOVED FROM LOCATION ', e.item.x, e.item.y) };
   * corner.remove();
   * @emits {EVENT_DELETED}
   **/
  remove() {
    this.__hasBeenRemoved = true;
    this.dispatchEvent({ type: EVENT_DELETED, item: this });
  }

  /**
   * Removes all the connected corners and itself. This in essence removes all the walls({@link Wall}) this corner is connected to.
   * @example
   * let corner1 = new Corner(floorplan, 0, 0);
   * let corner2 = new Corner(floorplan, 10, 0);
   * function cornerRemoved(e) { console.log('I WAS REMOVED FROM LOCATION ', e.item.x, e.item.y) } //Will log twice for two corners;
   * corner.removeAll();
   **/
  removeAll() {
    let i = 0;
    for (i = 0; i < this.wallStarts.length; i++) {
      this.wallStarts[i].remove();
    }
    for (i = 0; i < this.wallEnds.length; i++) {
      this.wallEnds[i].remove();
    }
    this.remove();
  }

  //Angle is in degrees 0 - 360
  closestAngle(angle) {
    let neighbors = this.adjacentCorners();
    let delta = 999999;
    let closestAngle = 0;
    let point = new Vector2();
    for (let i = 0; i < neighbors.length; i++) {
      let wall = this.wallToOrFrom(neighbors[i]);
      if (wall.wallType === WallTypes.CURVED) {
        continue;
      }
      let neighbourAngle = neighbors[i].location
        .clone()
        .sub(this.location)
        .angle();
      neighbourAngle = (neighbourAngle * 180) / Math.PI;
      let diff = Math.abs(angle - neighbourAngle);
      if (diff < delta) {
        delta = diff;
        point.x = neighbors[i].location.x;
        point.y = neighbors[i].location.y;
        closestAngle = neighbourAngle;
      }
    }
    return { angle: closestAngle, point: point };
  }

  updateAngles() {
    let neighbors = this.adjacentCorners();
    this._angles = [];
    this._angleDirections = [];
    this._startAngles = [];
    this._endAngles = [];
    this._cyclicNeighbors = [];
    if (neighbors.length < 2) {
      return;
    }

    let start = this.location.clone();
    let points = [];
    for (let i = 0; i < neighbors.length; i++) {
      points.push(neighbors[i].location);
    }
    let indicesAndAngles = Utils.getCyclicOrder(points, start);
    let indices = indicesAndAngles["indices"];
    let angles = indicesAndAngles["angles"];
    //		var N = (indices.length%2 === 0)? (indices.length < 3) ? indices.length - 1 : indices.length : indices.length - 1;
    let N = indices.length < 3 ? 1 : indices.length;
    for (let i = 0; i < N; i++) {
      let next = (i + 1) % indices.length;
      let cindex = indices[i];
      let nindex = indices[next];

      let cwall = this.wallToOrFrom(neighbors[cindex]);
      let nwall = this.wallToOrFrom(neighbors[nindex]);
      if (cwall != null && nwall != null) {
        if (
          cwall.wallType === WallTypes.CURVED ||
          nwall.wallType === WallTypes.CURVED
        ) {
          //					No use in showing angle between two curved or two walls with intermixed types of straight and curved
          //					Set everything to zero
          this._startAngles.push(0);
          this._endAngles.push(0);
          this._angles.push(0);
          this._angleDirections.push(new Vector2(0, 0));
          this._cyclicNeighbors.push(neighbors[indices[i]]);
          continue;
        }
      }

      let vectorA = points[cindex].clone().sub(start).normalize();
      let vectorB = points[nindex].clone().sub(start).normalize();
      let midVector = vectorA.add(vectorB).multiplyScalar(20.0);

      // let diffAngle = Math.abs(angles[next] - angles[i]);
      // diffAngle = (diffAngle > 180) ? 360 - diffAngle : diffAngle;
      let diffAngle = angles[next] - angles[i];
      diffAngle = Math.abs(Math.round(diffAngle * 10) / 10);
      diffAngle = diffAngle > 180 ? Math.abs(360 - diffAngle) : diffAngle;
      this._startAngles.push(angles[i]);
      this._endAngles.push(angles[next]);
      this._angles.push(diffAngle);
      this._angleDirections.push(midVector);
      this._cyclicNeighbors.push(neighbors[indices[i]]);
    }
  }

  /**
   * When a corner is moved from its location it will impact the connected rooms ({@link Room}) shape, thus their areas. This will update the rooms
   * @example
   * let corner = new Corner(floorplan, 0, 0);
   * corner.move(10, 0);
   **/
  updateAttachedRooms(explicit = false) {
    if (!this._hasChanged && !explicit) {
      return;
    }

    this.attachedRooms.forEach((room) => {
      room.updateArea();
    });
    this._hasChanged = false;
  }

  /** Gets the adjacent corners that are connected to this corner by walls ({@link Wall}).
   * @returns {Corner[]} Array of corners.
   */
  adjacentCorners() {
    let retArray = [];
    let i = 0;
    for (i = 0; i < this.wallStarts.length; i++) {
      retArray.push(this.wallStarts[i].getEnd());
    }
    for (i = 0; i < this.wallEnds.length; i++) {
      retArray.push(this.wallEnds[i].getStart());
    }
    //console.log('adjacentCorners ::',retArray)
    return retArray;
  }

  /** Checks if a wall is connected.
   * @param {Wall} wall A wall.
   * @returns {boolean} in case of connection.
   */
  isWallConnected(wall) {
    let i = 0;
    for (i = 0; i < this.wallStarts.length; i++) {
      if (this.wallStarts[i] === wall) {
        return true;
      }
    }
    for (i = 0; i < this.wallEnds.length; i++) {
      if (this.wallEnds[i] === wall) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the distance between this corner and a point in 2d space
   * @param {Vector2} point
   * @see https://threejs.org/docs/#api/en/math/Vector2
   * @return {Number} distance The distance
   **/
  distanceFrom(point) {
    let distance = Utils.distance(point, new Vector2(this.x, this.y));
    //console.log('x,y ' + x + ',' + y + ' to ' + this.getX() + ',' + this.getY() + ' is ' + distance);
    return distance;
  }

  /** Gets the distance from a wall.
   * @param {Wall} wall A wall.
   * @returns {Number} distance The distance.
   */
  distanceFromWall(wall) {
    let cPoint = new Vector2(this.x, this.y);
    if (wall.wallType === WallTypes.STRAIGHT) {
      return wall.distanceFrom(cPoint);
    } else if (wall.wallType === WallTypes.CURVED) {
      let p = wall.bezier.project(cPoint);
      let projected = new Vector2(p.x, p.y);
      return projected.distanceTo(cPoint);
    }
  }

  /** Gets the distance from a corner.
   * @param {Corner} corner A corner.
   * @returns {Number} The distance.
   */
  distanceFromCorner(corner) {
    return this.distanceFrom(new Vector2(corner.x, corner.y));
  }

  /** Detaches a wall.
   * @param {Wall} wall A wall.
   */
  detachWall(wall) {
    Utils.removeValue(this.wallStarts, wall);
    Utils.removeValue(this.wallEnds, wall);

    /**
     * If there are no walls connected to this corner then it is not
     * necessary to keep this corner around anymore as an orphan point.
     * But ensure you check if this corner has already been removed. Otherwise
     * it will be lead to recursion
     */
    if (
      this.wallStarts.length === 0 &&
      this.wallEnds.length === 0 &&
      !this.__hasBeenRemoved
    ) {
      this.remove();
    }
  }

  /** Attaches a start wall.
   * @param {Wall} wall A wall.
   */
  attachStart(wall) {
    this.wallStarts.push(wall);
  }

  /** Attaches an end wall.
   * @param {Wall} wall A wall.
   */
  attachEnd(wall) {
    this.wallEnds.push(wall);
  }

  /** Get wall to corner.
   * @param {Corner} corner A corner.
   * @return {Wall} The associated wall or null.
   */
  wallTo(corner) {
    for (let i = 0; i < this.wallStarts.length; i++) {
      if (this.wallStarts[i].getEnd() === corner) {
        return this.wallStarts[i];
      }
    }
    return null;
  }

  /** Get wall from corner.
   * @param {Corner}  corner A corner.
   * @return {Wall} The associated wall or null.
   */
  wallFrom(corner) {
    for (let i = 0; i < this.wallEnds.length; i++) {
      if (this.wallEnds[i].getStart() === corner) {
        return this.wallEnds[i];
      }
    }
    return null;
  }

  /** Get wall to or from corner.
   * @param {Corner} corner A corner.
   * @return {Wall} The associated wall or null.
   */
  wallToOrFrom(corner) {
    return this.wallTo(corner) || this.wallFrom(corner);
  }

  /** Get wall from corner.
   * @param {Corner}  corner A corner.
   */
  combineWithCorner(corner) {
    let i = 0;
    // update position to other corner's
    //		this.x = corner.x;
    //		this.y = corner.y;
    this.move(corner.x, corner.y, false);
    // absorb the other corner's wallStarts and wallEnds
    for (i = corner.wallStarts.length - 1; i >= 0; i--) {
      corner.wallStarts[i].setStart(this);
    }
    for (i = corner.wallEnds.length - 1; i >= 0; i--) {
      corner.wallEnds[i].setEnd(this);
    }

    let rooms = corner.getAttachedRooms();
    for (i = 0; i < rooms.length; i++) {
      let room = rooms[i];
      //Below returns the roomname object
      let roomname = this.floorplan.metaroomsdata[room.roomByCornersId];
      if (roomname) {
        let oldId = room.roomByCornersId;
        let newId = oldId.replace(corner.id, this.id);
        this.floorplan.metaroomsdata[newId] = {};
        this.floorplan.metaroomsdata[newId]["name"] = roomname["name"];
        delete this.floorplan.metaroomsdata[oldId];
      }
    }

    // delete the other corner
    corner.removeAll();
    this.removeDuplicateWalls();
    this.floorplan.update();
  }

  mergeWithIntersected(updateFloorPlan = true) {
    let i = 0;
    //console.log('mergeWithIntersected for object: ' + this.type);
    // check corners
    for (i = 0; i < this.floorplan.getCorners().length; i++) {
      let corner = this.floorplan.getCorners()[i];
      if (
        this.distanceFromCorner(corner) < cornerTolerance &&
        corner !== this
      ) {
        this.combineWithCorner(corner);
        return true;
      }
    }
    // check walls
    for (i = 0; i < this.floorplan.getWalls().length; i++) {
      let wall = this.floorplan.getWalls()[i];
      if (
        this.distanceFromWall(wall) < cornerTolerance &&
        !this.isWallConnected(wall)
      ) {
        // update position to be on wall
        let intersection;
        intersection = Utils.closestPointOnLine(
          new Vector2(this.x, this.y),
          wall.getStart(),
          wall.getEnd(),
        );
        // merge this corner into wall by breaking wall into two parts
        let newWall = this.floorplan.newWall(this, wall.getEnd());
        wall.setEnd(this);
        newWall.clearAttachedRooms();
        wall.clearAttachedRooms();

        //The below line is crashing because of recursive. This function mergeWithIntersected is called
        //From move(newX, newY) method. Now if we call move(newX, newY) from inside this method
        //It will lead to recursion. So ensure in the move(newX, newY) method mergeWithIntersected is not called
        //Hence added a third parameter to move(newX, newY, mergeWithIntersections) that is a boolean value
        //Send this boolean value as false to avoid recursion crashing of the application
        this.move(intersection.x, intersection.y, false, updateFloorPlan); //Causes Recursion if third parameter is true
        this.floorplan.update();
        return true;
      }
    }
    return false;
  }

  /** Ensure we do not have duplicate walls (i.e. same start and end points) */
  removeDuplicateWalls() {
    let i = 0;
    // delete the wall between these corners, if it exists
    let wallEndpoints = {};
    let wallStartpoints = {};
    for (i = this.wallStarts.length - 1; i >= 0; i--) {
      if (this.wallStarts[i].getEnd() === this) {
        // remove zero length wall
        this.wallStarts[i].remove();
      } else if (this.wallStarts[i].getEnd().id in wallEndpoints) {
        // remove duplicated wall
        this.wallStarts[i].remove();
      } else {
        wallEndpoints[this.wallStarts[i].getEnd().id] = true;
      }
    }
    for (i = this.wallEnds.length - 1; i >= 0; i--) {
      if (this.wallEnds[i].getStart() === this) {
        // removed zero length wall
        this.wallEnds[i].remove();
      } else if (this.wallEnds[i].getStart().id in wallStartpoints) {
        // removed duplicated wall
        this.wallEnds[i].remove();
      } else {
        wallStartpoints[this.wallEnds[i].getStart().id] = true;
      }
    }
  }
}
