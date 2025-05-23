import { Vector3 } from "three";

import { ParametricBaseDoor, DOOR_OPEN_DIRECTIONS } from "./ParametricBaseDoor";

export class ParametricDoorType6 extends ParametricBaseDoor {
  constructor(parameters) {
    super(parameters);
    this.__doorType = 6;
  }

  /**
   * Based on the DoorType the below method will change
   * This can be replaced by the appropriate door model class
   * This method will change with logic based on the door model type
   */
  __createForDoorModel(frameWidth, openingDirection) {
    let gap = 0.25; //0.002;
    let sf = this.__frameSize;
    let wf = frameWidth - sf * 2 - gap * 2;
    let hf = this.__frameHeight / 2 - gap * 2;
    let deep = this.__frameThickness * 0.5;

    let side = 0,
      minx = 0,
      maxx = 0;
    // # Open to right or left
    if (openingDirection === DOOR_OPEN_DIRECTIONS.RIGHT) {
      side = 1;
      minx = wf * -1;
      maxx = 0.0;
    } else {
      side = -1;
      minx = 0.0;
      maxx = wf;
    }
    let miny = 0.0; //# locked
    let maxy = deep;
    let minz = -hf;
    let maxz = hf - sf - gap;

    let myvertex = [
      new Vector3(
        minx,
        -1.57160684466362e-8 * 100,
        minz + 2.384185791015625e-6 * 100,
      ),
      new Vector3(maxx, -1.5599653124809265e-8 * 100, minz),
      new Vector3(minx, -1.5599653124809265e-8 * 100, maxz),
      new Vector3(
        minx,
        -1.5599653124809265e-8 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        minx,
        -1.57160684466362e-8 * 100,
        minz + 0.2500007152557373 * 100,
      ),
      new Vector3(
        maxx,
        -1.5599653124809265e-8 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(maxx, -1.5599653124809265e-8 * 100, maxz),
      new Vector3(
        maxx,
        -1.5599653124809265e-8 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.11609852313995361 * 100,
        -1.5599653124809265e-8 * 100,
        maxz,
      ),
      new Vector3(
        maxx - 0.12357193231582642 * 100,
        -1.5599653124809265e-8 * 100,
        minz,
      ),
      new Vector3(
        maxx - 0.11658430099487305 * 100,
        -1.5599653124809265e-8 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.12263774871826172 * 100,
        -1.5599653124809265e-8 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        minx,
        -1.57160684466362e-8 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        maxx,
        -1.5599653124809265e-8 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        maxx - 0.12076938152313232 * 100,
        -1.5599653124809265e-8 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.11735659837722778 * 100,
        -1.57160684466362e-8 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        minx + 0.12341010570526123 * 100,
        -1.5599653124809265e-8 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        minx + 0.11642247438430786 * 100,
        -1.57160684466362e-8 * 100,
        minz,
      ),
      new Vector3(
        minx + 0.11967337131500244 * 100,
        -1.57160684466362e-8 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        minx,
        -1.57160684466362e-8 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        maxx - 0.12032097578048706 * 100,
        -1.5599653124809265e-8 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        minx + 0.12389582395553589 * 100,
        -1.5599653124809265e-8 * 100,
        maxz,
      ),
      new Vector3(
        maxx,
        -1.5599653124809265e-8 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.11922496557235718 * 100,
        -1.57160684466362e-8 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.11922496557235718 * 100,
        -0.010000014677643776 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.12341010570526123 * 100,
        -0.010000014677643776 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.12032097578048706 * 100,
        -0.010000014677643776 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        minx + 0.11735659837722778 * 100,
        -0.010000014677643776 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        maxx - 0.11658430099487305 * 100,
        -0.010000014677643776 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.12263774871826172 * 100,
        -0.010000014677643776 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        minx + 0.11967337131500244 * 100,
        -0.010000014677643776 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        maxx - 0.12076938152313232 * 100,
        -0.010000014677643776 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.13388586044311523 * 100,
        -0.010000014677643776 * 100,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.1321108341217041 * 100,
        -0.010000014677643776 * 100,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.1372986137866974 * 100,
        -0.010000014677643776 * 100,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.13552364706993103 * 100,
        -0.010000014677643776 * 100,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.13802427053451538 * 100,
        -0.010000014677643776 * 100,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        maxx - 0.13493508100509644 * 100,
        -0.010000014677643776 * 100,
        minz + 0.8866067305207253 * 100,
      ),
      new Vector3(
        maxx - 0.13138526678085327 * 100,
        -0.010000014677643776 * 100,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        minx + 0.13447439670562744 * 100,
        -0.010000014677643776 * 100,
        minz + 0.8866067305207253 * 100,
      ),
      new Vector3(
        minx + 0.13388586044311523 * 100,
        -0.008776669390499592 * 100,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.1321108341217041 * 100,
        -0.008776669390499592 * 100,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.1372986137866974 * 100,
        -0.008776669390499592 * 100,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.13552364706993103 * 100,
        -0.008776669390499592 * 100,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.13802427053451538 * 100,
        -0.008776669390499592 * 100,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        maxx - 0.13493508100509644 * 100,
        -0.008776669390499592 * 100,
        minz + 0.8866067305207253 * 100,
      ),
      new Vector3(
        maxx - 0.13138526678085327 * 100,
        -0.008776669390499592 * 100,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        minx + 0.13447439670562744 * 100,
        -0.008776669390499592 * 100,
        minz + 0.8866067305207253 * 100,
      ),
      new Vector3(
        minx,
        maxy - 0.009999999776482582 * 100,
        minz + 2.384185791015625e-6 * 100,
      ),
      new Vector3(maxx, maxy - 0.009999999776482582 * 100, minz),
      new Vector3(minx, maxy - 0.009999999776482582 * 100, maxz),
      new Vector3(
        minx,
        maxy - 0.009999999776482582 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        minx,
        maxy - 0.009999999776482582 * 100,
        minz + 0.2500007152557373 * 100,
      ),
      new Vector3(
        maxx,
        maxy - 0.009999999776482582 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(maxx, maxy - 0.009999999776482582 * 100, maxz),
      new Vector3(
        maxx,
        maxy - 0.009999999776482582 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.11609852313995361 * 100,
        maxy - 0.009999999776482582 * 100,
        maxz,
      ),
      new Vector3(
        maxx - 0.12357193231582642 * 100,
        maxy - 0.009999999776482582 * 100,
        minz,
      ),
      new Vector3(
        maxx - 0.11658430099487305 * 100,
        maxy - 0.009999999776482582 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.12263774871826172 * 100,
        maxy - 0.009999999776482582 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        minx,
        maxy - 0.009999999776482582 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        maxx,
        maxy - 0.009999999776482582 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        maxx - 0.12076938152313232 * 100,
        maxy - 0.009999999776482582 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.11735659837722778 * 100,
        maxy - 0.009999999776482582 * 100,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        minx + 0.12341010570526123 * 100,
        maxy - 0.009999999776482582 * 100,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        minx + 0.11642247438430786 * 100,
        maxy - 0.009999999776482582 * 100,
        minz,
      ),
      new Vector3(
        minx + 0.11967337131500244 * 100,
        maxy - 0.009999999776482582 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        minx,
        maxy - 0.009999999776482582 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        maxx - 0.12032097578048706 * 100,
        maxy - 0.009999999776482582 * 100,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        minx + 0.12389582395553589 * 100,
        maxy - 0.009999999776482582 * 100,
        maxz,
      ),
      new Vector3(
        maxx,
        maxy - 0.009999999776482582 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.11922496557235718 * 100,
        maxy - 0.009999999776482582 * 100,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.11922496557235718 * 100,
        maxy,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.12341010570526123 * 100,
        maxy,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.12032097578048706 * 100,
        maxy,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        minx + 0.11735659837722778 * 100,
        maxy,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        maxx - 0.11658430099487305 * 100,
        maxy,
        maxz - 0.12999999523162842 * 100,
      ),
      new Vector3(
        maxx - 0.12263774871826172 * 100,
        maxy,
        minz + 0.25000011920928955 * 100,
      ),
      new Vector3(
        minx + 0.11967337131500244 * 100,
        maxy,
        minz + 0.8700000941753387 * 100,
      ),
      new Vector3(
        maxx - 0.12076938152313232 * 100,
        maxy,
        minz + 0.7500001192092896 * 100,
      ),
      new Vector3(
        minx + 0.13388586044311523 * 100,
        maxy,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.1321108341217041 * 100,
        maxy,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.1372986137866974 * 100,
        maxy,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.13552364706993103 * 100,
        maxy,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.13802427053451538 * 100,
        maxy,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        maxx - 0.13493508100509644 * 100,
        maxy,
        minz + 0.8866067305207253 * 100,
      ),
      new Vector3(
        maxx - 0.13138526678085327 * 100,
        maxy,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        minx + 0.13447439670562744 * 100,
        maxy,
        minz + 0.8866067305207253 * 100,
      ),
      new Vector3(
        minx + 0.13388586044311523 * 100,
        maxy - 0.0012233443558216095 * 100,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.1321108341217041 * 100,
        maxy - 0.0012233443558216095 * 100,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.1372986137866974 * 100,
        maxy - 0.0012233443558216095 * 100,
        minz + 0.2625001072883606 * 100,
      ),
      new Vector3(
        maxx - 0.13552364706993103 * 100,
        maxy - 0.0012233443558216095 * 100,
        minz + 0.7375001013278961 * 100,
      ),
      new Vector3(
        minx + 0.13802427053451538 * 100,
        maxy - 0.0012233443558216095 * 100,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        maxx - 0.13493508100509644 * 100,
        maxy - 0.0012233443558216095 * 100,
        minz + 0.8866067305207253 * 100,
      ),
      new Vector3(
        maxx - 0.13138526678085327 * 100,
        maxy - 0.0012233443558216095 * 100,
        maxz - 0.14747536182403564 * 100,
      ),
      new Vector3(
        minx + 0.13447439670562744 * 100,
        maxy - 0.0012233443558216095 * 100,
        minz + 0.8866067305207253 * 100,
      ),
    ];

    let myfaces = [
      new Face3(0, 4, 15),
      new Face3(17, 0, 15),
      new Face3(3, 2, 21),
      new Face3(16, 3, 21),
      new Face3(4, 19, 23),
      new Face3(15, 4, 23),
      new Face3(10, 8, 6),
      new Face3(7, 10, 6),
      new Face3(16, 21, 8),
      new Face3(10, 16, 8),
      new Face3(12, 3, 16),
      new Face3(18, 12, 16),
      new Face3(17, 15, 11),
      new Face3(9, 17, 11),
      new Face3(23, 18, 20),
      new Face3(14, 23, 20),
      new Face3(19, 12, 18),
      new Face3(23, 19, 18),
      new Face3(9, 11, 5),
      new Face3(1, 9, 5),
      new Face3(11, 14, 22),
      new Face3(5, 11, 22),
      new Face3(20, 10, 7),
      new Face3(13, 20, 7),
      new Face3(14, 20, 13),
      new Face3(22, 14, 13),
      new Face3(28, 10, 20),
      new Face3(26, 28, 20),
      new Face3(25, 16, 10),
      new Face3(28, 25, 10),
      new Face3(30, 18, 16),
      new Face3(25, 30, 16),
      new Face3(26, 20, 18),
      new Face3(30, 26, 18),
      new Face3(29, 11, 15),
      new Face3(27, 29, 15),
      new Face3(24, 23, 14),
      new Face3(31, 24, 14),
      new Face3(27, 15, 23),
      new Face3(24, 27, 23),
      new Face3(31, 14, 11),
      new Face3(29, 31, 11),
      new Face3(32, 24, 31),
      new Face3(35, 32, 31),
      new Face3(33, 27, 24),
      new Face3(32, 33, 24),
      new Face3(34, 29, 27),
      new Face3(33, 34, 27),
      new Face3(35, 31, 29),
      new Face3(34, 35, 29),
      new Face3(38, 28, 26),
      new Face3(37, 38, 26),
      new Face3(37, 26, 30),
      new Face3(39, 37, 30),
      new Face3(36, 25, 28),
      new Face3(38, 36, 28),
      new Face3(39, 30, 25),
      new Face3(36, 39, 25),
      new Face3(42, 34, 33),
      new Face3(41, 42, 33),
      new Face3(47, 39, 36),
      new Face3(44, 47, 36),
      new Face3(43, 35, 34),
      new Face3(42, 43, 34),
      new Face3(46, 38, 37),
      new Face3(45, 46, 37),
      new Face3(41, 33, 32),
      new Face3(40, 41, 32),
      new Face3(44, 36, 38),
      new Face3(46, 44, 38),
      new Face3(40, 32, 35),
      new Face3(43, 40, 35),
      new Face3(45, 37, 39),
      new Face3(47, 45, 39),
      new Face3(10, 20, 18),
      new Face3(16, 10, 18),
      new Face3(15, 23, 14),
      new Face3(11, 15, 14),
      new Face3(48, 52, 63),
      new Face3(65, 48, 63),
      new Face3(51, 50, 69),
      new Face3(64, 51, 69),
      new Face3(52, 67, 71),
      new Face3(63, 52, 71),
      new Face3(58, 56, 54),
      new Face3(55, 58, 54),
      new Face3(64, 69, 56),
      new Face3(58, 64, 56),
      new Face3(60, 51, 64),
      new Face3(66, 60, 64),
      new Face3(65, 63, 59),
      new Face3(57, 65, 59),
      new Face3(71, 66, 68),
      new Face3(62, 71, 68),
      new Face3(67, 60, 66),
      new Face3(71, 67, 66),
      new Face3(57, 59, 53),
      new Face3(49, 57, 53),
      new Face3(59, 62, 70),
      new Face3(53, 59, 70),
      new Face3(68, 58, 55),
      new Face3(61, 68, 55),
      new Face3(62, 68, 61),
      new Face3(70, 62, 61),
      new Face3(76, 58, 68),
      new Face3(74, 76, 68),
      new Face3(73, 64, 58),
      new Face3(76, 73, 58),
      new Face3(78, 66, 64),
      new Face3(73, 78, 64),
      new Face3(74, 68, 66),
      new Face3(78, 74, 66),
      new Face3(77, 59, 63),
      new Face3(75, 77, 63),
      new Face3(72, 71, 62),
      new Face3(79, 72, 62),
      new Face3(75, 63, 71),
      new Face3(72, 75, 71),
      new Face3(79, 62, 59),
      new Face3(77, 79, 59),
      new Face3(80, 72, 79),
      new Face3(83, 80, 79),
      new Face3(81, 75, 72),
      new Face3(80, 81, 72),
      new Face3(82, 77, 75),
      new Face3(81, 82, 75),
      new Face3(83, 79, 77),
      new Face3(82, 83, 77),
      new Face3(86, 76, 74),
      new Face3(85, 86, 74),
      new Face3(85, 74, 78),
      new Face3(87, 85, 78),
      new Face3(84, 73, 76),
      new Face3(86, 84, 76),
      new Face3(87, 78, 73),
      new Face3(84, 87, 73),
      new Face3(90, 82, 81),
      new Face3(89, 90, 81),
      new Face3(95, 87, 84),
      new Face3(92, 95, 84),
      new Face3(91, 83, 82),
      new Face3(90, 91, 82),
      new Face3(94, 86, 85),
      new Face3(93, 94, 85),
      new Face3(89, 81, 80),
      new Face3(88, 89, 80),
      new Face3(92, 84, 86),
      new Face3(94, 92, 86),
      new Face3(88, 80, 83),
      new Face3(91, 88, 83),
      new Face3(93, 85, 87),
      new Face3(95, 93, 87),
      new Face3(58, 68, 66),
      new Face3(64, 58, 66),
      new Face3(63, 71, 62),
      new Face3(59, 63, 62),
      new Face3(21, 2, 50),
      new Face3(69, 21, 50),
      new Face3(69, 56, 8),
      new Face3(21, 69, 8),
      new Face3(56, 54, 6),
      new Face3(8, 56, 6),
      new Face3(7, 6, 54),
      new Face3(55, 7, 54),
      new Face3(13, 7, 55),
      new Face3(61, 13, 55),
      new Face3(22, 13, 61),
      new Face3(70, 22, 61),
      new Face3(70, 53, 5),
      new Face3(22, 70, 5),
      new Face3(53, 49, 1),
      new Face3(5, 53, 1),
      new Face3(9, 1, 49),
      new Face3(57, 9, 49),
      new Face3(17, 9, 57),
      new Face3(65, 17, 57),
      new Face3(65, 48, 0),
      new Face3(17, 65, 0),
      new Face3(4, 0, 48),
      new Face3(52, 4, 48),
      new Face3(19, 4, 52),
      new Face3(67, 19, 52),
      new Face3(67, 60, 12),
      new Face3(19, 67, 12),
      new Face3(60, 51, 3),
      new Face3(12, 60, 3),
      new Face3(51, 50, 2),
      new Face3(3, 51, 2),
    ];

    let normal_ids = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
      93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
      109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
      124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
      139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153,
      154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168,
      169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183,
      184, 185, 186, 187,
    ];
    let glass_ids = [74, 75, 152, 153];
    let i = 0;
    for (i = 0; i < normal_ids.length; i++) {
      myfaces[normal_ids[i]].materialIndex = this.__doorMaterialId;
    }
    for (i = 0; i < glass_ids.length; i++) {
      myfaces[glass_ids[i]].materialIndex = this.__glassMaterialId;
    }
    return {
      vertices: myvertex,
      faces: myfaces,
      widthFactor: wf,
      depth: deep,
      side: side,
    };
  }
}
