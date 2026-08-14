---
title: OrchestrateAI
emoji: 🤖
colorFrom: indigo
colorTo: sky
sdk: docker
app_port: 7860
pinned: false
license: mit
app_file: backend/app/main.py
---

<div align="center">

# 🤖 OrchestrateAI

### An Agentic AI that autonomously plans, trains, evaluates, and improves Machine Learning experiments.

Describe your goal in plain English. The agent inspects the data, picks algorithms,
tunes hyperparameters, runs **real** Scikit-learn / XGBoost / LightGBM models, compares
the results, and decides what to try next — until it finds the best model.

<p>
<img alt="Python" src="https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white"/>
<img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white"/>
<img alt="LangGraph" src="https://img.shields.io/badge/LangGraph-orchestrated-7c3aed"/>
<img alt="scikit-learn" src="https://img.shields.io/badge/scikit--learn-1.5-F7931E?logo=scikitlearn&logoColor=white"/>
<img alt="MLflow" src="https://img.shields.io/badge/MLflow-tracked-0194E2?logo=mlflow&logoColor=white"/>
<img alt="License" src="https://img.shields.io/badge/License-MIT-green"/>
</p>

</div>

---

## ✨ Features

- 🧠 **Real agentic workflow** powered by **LangGraph** — Planner → Dataset Analysis → Training → Evaluation → Analyst → Decision → (loop) → Final Report.
- 📊 **Genuine ML, never faked** — every experiment is an actual `fit()`/`predict()` on a held-out test set with real RMSE, R², accuracy, F1, etc.
- 🔒 **Safe by construction** — the LLM may only select models from an allow-list with validated hyperparameters. It **never executes generated code** (no `exec`, `eval`, or subprocess on LLM output).
- 🔀 **11 regression / 10 classification models** including Linear, Ridge, Lasso, Decision Tree, Random Forest, Gradient Boosting, KNN, SVM, MLP, Naive Bayes, **XGBoost**, and **LightGBM**.
- 🔌 **Pluggable LLM** — [Ollama](https://ollama.com) (Qwen 2.5 7B locally), Hugging Face Inference API, or a deterministic heuristic fallback so the app runs with no GPU / no API key.
- 📈 **Experiment tracking** with **MLflow** + SQLite — every run, metric, parameter, artifact, and agent event is persisted.
- 📁 **Built-in & uploaded datasets** — California Housing, Diabetes, Iris, Wine, Breast Cancer out of the box, or upload any CSV. Target columns are auto-detected; ID/high-cardinality columns are dropped automatically to prevent overfitting.
- 🖥️ **Polished dashboard** — live agent activity, pipeline status, big hero metric, coefficient pills, dataset stat card, experiment comparison table, charts, feature importances, and an AI-generated final summary.
- ⬇️ **One-click model download** — export the best trained model (`.joblib`).
- ☁️ **Deployment-ready** — Docker image for [Hugging Face Spaces](https://huggingface.co/spaces), static frontend for [Vercel](https://vercel.com), CORS preconfigured.

---

## 🖼️ How it works

```
User Goal → Planner → Dataset Analysis
                         ↓
              Decision ← Analyst ← Evaluator ← Training
                 ↓ (loop until stop/budget)
              Final Report (best model + charts)
```

The agent decides the sequence **dynamically** based on actual results — it is not a
hardcoded pipeline. If a model is underperforming it may try a different algorithm;
if results plateau it stops and reports the best model.

---

## 🚀 Quick start (local)

### Prerequisites
- Python **3.10 – 3.12**
- (Optional) [Ollama](https://ollama.com/download) for the local Qwen 2.5 7B LLM

### 1. Clone & install

```bash
git clone https://github.com/<your-username>/ml-experiment-orchestrator.git
cd ml-experiment-orchestrator/backend

python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
```

### 2. Run the server

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 7860
```

Open **http://localhost:7860** in your browser.

### 3. Run your first experiment

- Type a goal, e.g.
  > *"Find the best regression model for California Housing and minimize RMSE. Try at least 6 different experiments."*
- Pick a dataset (or upload a CSV).
- Click **Start Agent** and watch it work.

---

## 🦙 Optional: local LLM with Ollama + Qwen 2.5

```bash
# 1. Install Ollama from https://ollama.com/download
ollama pull qwen2.5:7b
ollama serve
```

Copy `.env.example` to `.env` and set:

```env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```

Restart the server. `/api/health` will then show `"llm_provider":"ollama"`.

> Without Ollama or an `HF_TOKEN`, the app automatically uses a built-in heuristic
> LLM that makes all planning/decisions from **real metrics** (no fabricated numbers),
> so the full product works on day one.

---

## 📂 Project structure

```text
ml-experiment-orchestrator/
├── backend/
│   ├── app/
│   │   ├── agents/        # LangGraph nodes, state, workflow, runner
│   │   ├── api/           # FastAPI routes
│   │   ├── llm/           # Ollama / HuggingFace / mock LLM clients
│   │   ├── ml/            # Safe model registry, datasets, training, metrics
│   │   ├── tools/         # Validated tools the agent can call
│   │   ├── tracking/      # MLflow tracker + matplotlib charts
│   │   ├── config.py
│   │   ├── db.py
│   │   ├── main.py
│   │   └── schemas.py
│   ├── tests/
│   └── requirements.txt
├── frontend/              # Static dashboard (HTML/CSS/JS, Vercel-ready)
├── datasets/              # Uploaded CSVs
├── experiments/           # SQLite DB + MLflow artifacts
├── models/                # Serialised trained models
├── Dockerfile             # Hugging Face Spaces
├── docker-compose.yml     # Backend + MLflow stack
├── .env.example
└── README.md
```

---

## 🔌 API reference

| Method | Path | Description |
|---|---|---|
| GET   | `/api/health` | Backend + LLM status |
| GET   | `/api/datasets` | List built-in and uploaded datasets |
| GET   | `/api/datasets/{id}` | Inspect a dataset (columns, stats, correlations) |
| POST  | `/api/datasets/upload` | Upload a CSV (`multipart/form-data`) |
| POST  | `/api/datasets/{id}/target` | Set/change the target column |
| GET   | `/api/models?task=regression` | List available models |
| POST  | `/api/jobs` | Start an agent job |
| GET   | `/api/jobs` | List recent jobs |
| GET   | `/api/jobs/{id}` | Full job state (plan, events, experiments, report) |
| GET   | `/api/jobs/{id}/charts` | Base64 comparison / trend / importance charts |
| GET   | `/api/jobs/{id}/insights` | Best-model coefficients and dataset correlations |
| GET   | `/api/jobs/{id}/compare` | Structured model ranking |
| GET   | `/api/jobs/{id}/download-model` | Download the best `.joblib` |
| GET   | `/docs` | Interactive Swagger UI |

---

## 🐳 Docker

### Single container (Hugging Face Spaces / self-host)

```bash
docker build -t orchestrateai .
docker run -p 7860:7860 -v $(pwd)/experiments:/app/experiments orchestrateai
```

### Full stack with MLflow (docker-compose)

```bash
docker compose up --build
```
- Dashboard + API → http://localhost:7860
- MLflow UI       → http://localhost:5000

---

## ☁️ Deploy

### Hugging Face Spaces (backend + UI in one)
1. Create a new Space → **SDK: Docker**.
2. Push this repo (or attach GitHub).
3. The `Dockerfile` builds the API and bundles the frontend; port **7860** is exposed.
4. Add secrets if needed: `HF_TOKEN`, `LLM_PROVIDER=auto`, `CORS_ORIGINS=*`.
5. Open `https://<your-space>.hf.space`.

### Vercel (frontend only)
1. Import the repo, set **Root Directory** to `frontend/`.
2. No build step — `vercel.json` handles static output.
3. In the app's **Settings** panel, set the Backend URL to `https://<your-space>.hf.space/api`.

---

## 🛡️ Safety model

The LLM returns **structured JSON** describing *what* to do. A fixed set of
validated Python tools is the only thing that touches data or models:

- `inspect_dataset` — loads a known dataset, computes summaries
- `validate_experiment` — enforces the model/parameter allow-list
- `execute_experiment` — trains a validated estimator and computes real metrics
- `compare_experiments` — ranks real results

There is **no dynamic code generation** on any LLM-produced string.

---

## 🧪 Tests

```bash
cd backend
pytest -q
```

Includes a full end-to-end agent run that trains real models on California Housing.

---

## 🛠️ Tech stack

| Layer | Technologies |
|---|---|
| Agent | LangGraph, LangChain Core |
| ML | scikit-learn, XGBoost, LightGBM, pandas, NumPy |
| Tracking | MLflow, SQLite |
| Backend | FastAPI, Uvicorn, Pydantic, SQLAlchemy |
| Frontend | Vanilla HTML/CSS/JS (dark dashboard) |
| Charts | Matplotlib |
| LLM | Ollama (Qwen 2.5 7B) · Hugging Face Inference · heuristic fallback |

---

## 📝 License

MIT © 2026 — free to use, modify, and deploy.

---

<div align="center">
<b>If you find this useful, give it a ⭐ on GitHub!</b>
</div>
