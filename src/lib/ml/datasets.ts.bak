import type { DatasetPayload, TaskType } from "@/lib/domain";
import { clip, mulberry32, normalSample } from "@/lib/ml/math";
import { computeDatasetStats } from "@/lib/ml/preprocess";

export interface BuiltinDataset {
  slug: string;
  name: string;
  taskType: TaskType;
  description: string;
  targetColumn: string;
  payload: DatasetPayload;
}

function californiaHousing(): DatasetPayload {
  const rng = mulberry32(20260322);
  const n = 1600;
  const X: number[][] = [];
  const y: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const medInc = clip(Math.exp(1.15 + 0.45 * normalSample(rng)), 0.5, 15);
    const houseAge = clip(15 + 14 * normalSample(rng), 1, 52);
    const aveRooms = clip(5.4 + 1.1 * normalSample(rng), 2.2, 12);
    const aveBedrms = clip(1.05 + 0.18 * normalSample(rng), 0.6, 3.2);
    const population = clip(Math.exp(6.8 + 0.7 * normalSample(rng)), 80, 9000);
    const aveOccup = clip(2.9 + 0.7 * normalSample(rng), 1.1, 8);
    const latitude = 32.6 + rng() * 9.2;
    const longitude = -124.2 + rng() * 10.1;

    const sf = Math.exp(-((latitude - 37.8) ** 2) / 1.4 - (longitude + 122.3) ** 2 / 1.6);
    const la = Math.exp(-((latitude - 34.05) ** 2) / 1.6 - (longitude + 118.25) ** 2 / 1.8);
    const coastal = clip(0.15 + 1.7 * sf + 1.4 * la + 0.08 * (-118 - longitude) / 6, 0, 2.4);

    const value =
      0.72 * medInc +
      0.18 * aveRooms +
      0.08 * (houseAge / 20) * coastal -
      0.22 * aveOccup -
      0.05 * aveBedrms +
      1.15 * coastal +
      0.00001 * Math.min(population, 4000) +
      0.28 * normalSample(rng);
    X.push([medInc, houseAge, aveRooms, aveBedrms, population, aveOccup, latitude, longitude]);
    y.push(clip(value, 0.15, 5));
  }
  return {
    X,
    y,
    featureNames: [
      "MedInc",
      "HouseAge",
      "AveRooms",
      "AveBedrms",
      "Population",
      "AveOccup",
      "Latitude",
      "Longitude",
    ],
    targetName: "MedHouseVal",
  };
}

function diabetesProgression(): DatasetPayload {
  const rng = mulberry32(91);
  const n = 900;
  const X: number[][] = [];
  const y: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const age = clip(48 + 12 * normalSample(rng), 20, 80);
    const sex = rng() > 0.5 ? 1 : 0;
    const bmi = clip(26 + 5 * normalSample(rng), 16, 48);
    const bp = clip(90 + 14 * normalSample(rng), 60, 140);
    const s1 = clip(180 + 30 * normalSample(rng), 80, 300);
    const s2 = clip(120 + 25 * normalSample(rng), 40, 240);
    const s3 = clip(50 + 12 * normalSample(rng), 15, 110);
    const s4 = clip(4.5 + 1.3 * normalSample(rng), 1, 10);
    const s5 = clip(4.6 + 0.5 * normalSample(rng), 3, 6.5);
    const s6 = clip(91 + 11 * normalSample(rng), 50, 140);
    const target =
      1.8 * (bmi - 25) +
      0.7 * (bp - 90) +
      8 * (s5 - 4.5) -
      0.35 * s3 +
      4 * sex +
      0.08 * age +
      6 * normalSample(rng) +
      140;
    X.push([age, sex, bmi, bp, s1, s2, s3, s4, s5, s6]);
    y.push(clip(target, 40, 320));
  }
  return {
    X,
    y,
    featureNames: ["age", "sex", "bmi", "bp", "s1", "s2", "s3", "s4", "s5", "s6"],
    targetName: "progression",
  };
}

function wineQuality(): DatasetPayload {
  const rng = mulberry32(17);
  const n = 1200;
  const X: number[][] = [];
  const y: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const fa = clip(8.3 + 1.7 * normalSample(rng), 4.5, 15);
    const va = clip(0.53 + 0.18 * normalSample(rng), 0.12, 1.4);
    const ca = clip(0.27 + 0.18 * normalSample(rng), 0, 1);
    const sugar = clip(2.5 + 1.4 * Math.abs(normalSample(rng)), 0.8, 14);
    const chlorides = clip(0.087 + 0.04 * normalSample(rng), 0.02, 0.4);
    const fso2 = clip(16 + 10 * Math.abs(normalSample(rng)), 2, 70);
    const tso2 = clip(46 + 28 * Math.abs(normalSample(rng)), 8, 220);
    const density = clip(0.9967 + 0.002 * normalSample(rng), 0.99, 1.004);
    const ph = clip(3.31 + 0.15 * normalSample(rng), 2.8, 4);
    const sulphates = clip(0.66 + 0.17 * normalSample(rng), 0.3, 1.8);
    const alcohol = clip(10.4 + 1.1 * normalSample(rng), 8.2, 14.5);
    const quality =
      3.1 +
      0.32 * alcohol -
      1.7 * va +
      0.9 * sulphates +
      0.15 * ca -
      1.8 * chlorides -
      8 * (density - 0.996) +
      0.18 * normalSample(rng);
    X.push([fa, va, ca, sugar, chlorides, fso2, tso2, density, ph, sulphates, alcohol]);
    y.push(clip(quality, 3, 8));
  }
  return {
    X,
    y,
    featureNames: [
      "fixed_acidity",
      "volatile_acidity",
      "citric_acid",
      "residual_sugar",
      "chlorides",
      "free_sulfur_dioxide",
      "total_sulfur_dioxide",
      "density",
      "pH",
      "sulphates",
      "alcohol",
    ],
    targetName: "quality",
  };
}

function irisFlowers(): DatasetPayload {
  const rng = mulberry32(3);
  const centers = [
    [5.0, 3.4, 1.5, 0.2],
    [5.9, 2.8, 4.3, 1.3],
    [6.6, 3.0, 5.5, 2.0],
  ];
  const X: number[][] = [];
  const y: number[] = [];
  for (let c = 0; c < 3; c += 1) {
    for (let i = 0; i < 120; i += 1) {
      X.push(centers[c].map((value, j) => value + (j < 2 ? 0.28 : 0.22) * normalSample(rng)));
      y.push(c);
    }
  }
  return {
    X,
    y,
    featureNames: ["sepal_length", "sepal_width", "petal_length", "petal_width"],
    targetName: "species",
    classNames: ["setosa", "versicolor", "virginica"],
  };
}

function incomeClass(): DatasetPayload {
  const rng = mulberry32(44);
  const n = 1400;
  const X: number[][] = [];
  const y: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const age = clip(38 + 12 * normalSample(rng), 18, 75);
    const education = clip(10 + 3.2 * normalSample(rng), 4, 16);
    const hours = clip(40 + 9 * normalSample(rng), 10, 80);
    const capital = clip(Math.exp(2.2 + 1.8 * normalSample(rng)) - 8, 0, 20000);
    const experience = clip(age - education - 6 + 2 * normalSample(rng), 0, 50);
    const score =
      0.08 * (age - 30) +
      0.55 * (education - 10) +
      0.04 * (hours - 40) +
      0.00012 * capital +
      0.05 * experience +
      0.7 * normalSample(rng);
    X.push([age, education, hours, capital, experience]);
    y.push(score > 0.6 ? 1 : 0);
  }
  return {
    X,
    y,
    featureNames: ["age", "education_years", "hours_per_week", "capital_gain", "experience"],
    targetName: "high_income",
    classNames: ["<=50K", ">50K"],
  };
}

export function builtinDatasets(): BuiltinDataset[] {
  const defs: Array<Omit<BuiltinDataset, "payload"> & { build: () => DatasetPayload }> = [
    {
      slug: "california-housing",
      name: "California Housing",
      taskType: "regression",
      targetColumn: "MedHouseVal",
      description:
        "District-level California housing data. Predict median house value from income, occupancy, and geography.",
      build: californiaHousing,
    },
    {
      slug: "diabetes",
      name: "Diabetes Progression",
      taskType: "regression",
      targetColumn: "progression",
      description: "Clinical measurements used to predict a quantitative disease progression score.",
      build: diabetesProgression,
    },
    {
      slug: "wine-quality",
      name: "Wine Quality",
      taskType: "regression",
      targetColumn: "quality",
      description: "Physicochemical wine tests used to estimate expert quality scores.",
      build: wineQuality,
    },
    {
      slug: "iris",
      name: "Iris Flowers",
      taskType: "classification",
      targetColumn: "species",
      description: "Classic 3-class flower dataset for quick classification experiments.",
      build: irisFlowers,
    },
    {
      slug: "income",
      name: "Income Bracket",
      taskType: "classification",
      targetColumn: "high_income",
      description: "Tabular census-style features for predicting whether income exceeds $50K.",
      build: incomeClass,
    },
  ];

  return defs.map((def) => ({
    slug: def.slug,
    name: def.name,
    taskType: def.taskType,
    targetColumn: def.targetColumn,
    description: def.description,
    payload: def.build(),
  }));
}

export function describeBuiltin(dataset: BuiltinDataset) {
  return {
    ...dataset,
    stats: computeDatasetStats(dataset.payload, dataset.taskType),
    featureColumns: dataset.payload.featureNames,
    rowCount: dataset.payload.X.length,
  };
}
