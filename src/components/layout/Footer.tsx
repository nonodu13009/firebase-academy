import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Flame className="w-5 h-5 text-orange-400" />
              Firebase Academy
            </div>
            <p className="text-sm text-muted-foreground">
              Formation Firebase de 0 à 100.
              <br />
              Fait avec Next.js + Firebase.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Liens utiles</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://firebase.google.com/docs?hl=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Documentation Firebase FR
                </a>
              </li>
              <li>
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Console Firebase
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@firebase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Firebase YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://firebase.google.com/pricing?hl=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Tarifs Firebase
                </a>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Ressources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/glossaire" className="hover:text-foreground transition-colors">
                  Glossaire
                </a>
              </li>
              <li>
                <a href="/exemples" className="hover:text-foreground transition-colors">
                  Exemples concrets
                </a>
              </li>
              <li>
                <a href="/reference" className="hover:text-foreground transition-colors">
                  Fiches référence
                </a>
              </li>
              <li>
                <a href="/formation" className="hover:text-foreground transition-colors">
                  Plan de formation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          Firebase Academy — Formation open source
        </div>
      </div>
    </footer>
  );
}
