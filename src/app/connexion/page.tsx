"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Flame, Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
} from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";

type Mode = "login" | "register" | "reset";

export default function ConnexionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    router.push("/formation");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "reset") {
        await resetPassword(email);
        setSuccess("Email de reinitialisation envoye ! Verifie ta boite mail.");
        setMode("login");
      } else if (mode === "register") {
        await signUpWithEmail(email, password);
        router.push("/formation");
      } else {
        await signInWithEmail(email, password);
        router.push("/formation");
      }
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      switch (firebaseError.code) {
        case "auth/invalid-email":
          setError("Adresse email invalide.");
          break;
        case "auth/user-not-found":
          setError("Aucun compte avec cet email.");
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Email ou mot de passe incorrect.");
          break;
        case "auth/email-already-in-use":
          setError("Un compte existe deja avec cet email.");
          break;
        case "auth/weak-password":
          setError("Le mot de passe doit faire au moins 6 caracteres.");
          break;
        default:
          setError("Une erreur est survenue. Reessaie.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/formation");
    } catch {
      setError("Erreur de connexion avec Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-neutral-900 border-neutral-800 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Flame className="w-10 h-10 text-orange-400 mx-auto" />
          <h1 className="text-2xl font-bold">
            {mode === "login" && "Connexion"}
            {mode === "register" && "Creer un compte"}
            {mode === "reset" && "Mot de passe oublie"}
          </h1>
          <p className="text-sm text-neutral-400">
            {mode === "login" && "Connecte-toi pour suivre ta progression"}
            {mode === "register" && "Inscris-toi pour sauvegarder ta progression"}
            {mode === "reset" && "Entre ton email pour recevoir un lien de reinitialisation"}
          </p>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg p-3">
            {success}
          </div>
        )}

        {/* Google Button */}
        {mode !== "reset" && (
          <>
            <Button
              onClick={handleGoogle}
              disabled={loading}
              variant="outline"
              className="w-full border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-800" />
              <span className="text-xs text-neutral-500">ou par email</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
              />
            </div>
          </div>

          {mode !== "reset" && (
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Mot de passe</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="6 caracteres minimum"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pr-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {mode === "login" && (
            <button
              type="button"
              onClick={() => {
                setMode("reset");
                setError("");
                setSuccess("");
              }}
              className="text-xs text-orange-400 hover:text-orange-300"
            >
              Mot de passe oublie ?
            </button>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading
              ? "Chargement..."
              : mode === "login"
                ? "Se connecter"
                : mode === "register"
                  ? "Creer mon compte"
                  : "Envoyer le lien"}
          </Button>
        </form>

        {/* Toggle mode */}
        <div className="text-center text-sm text-neutral-400">
          {mode === "login" && (
            <>
              Pas encore de compte ?{" "}
              <button
                onClick={() => {
                  setMode("register");
                  setError("");
                  setSuccess("");
                }}
                className="text-orange-400 hover:text-orange-300"
              >
                Inscris-toi
              </button>
            </>
          )}
          {mode === "register" && (
            <>
              Deja un compte ?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                className="text-orange-400 hover:text-orange-300"
              >
                Connecte-toi
              </button>
            </>
          )}
          {mode === "reset" && (
            <button
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className="flex items-center gap-1 text-orange-400 hover:text-orange-300 mx-auto"
            >
              <ArrowLeft className="w-3 h-3" />
              Retour a la connexion
            </button>
          )}
        </div>

        {/* Back to home */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-300"
          >
            Retour a l&apos;accueil
          </a>
        </div>
      </Card>
    </div>
  );
}
