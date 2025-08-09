import {useMemo, useState, useRef} from "react";
import {DashboardLayout} from "@/components/DashboardLayout";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Users, Plus, Search, Save, User, MessageCircle, Heart, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


// --- Demo data ---------------------------------------------------------------
type ModelPersonality = {
  age: string;
  location: string;
  occupation: string;
  interests: string[]; // store as array, edit as comma-separated
  personality: string;
  communicationStyle: string;
  background: string;
  specialties: string[];
};

type ModelItem = {
  id: number | null;
  name: string;
  username: string;
  avatar?: string | null; // data URL / http URL / null
  personality: ModelPersonality;
};

const Avatar = ({
                  name,
                  src,
                  size = 40,
                  className = "",
                }: { name: string; src?: string | null; size?: number; className?: string }) => {
  const [errored, setErrored] = useState(false);
  const initials = (name || "N")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");

  if (src && !errored) {
    return (
      <img
        src={src}
        onError={() => setErrored(true)}
        alt={name}
        className={`rounded-full object-cover ${className}`}
        style={{width: size, height: size}}
      />
    );
  }
  return (
    <div
      className={`rounded-full bg-primary/20 text-accent-foreground flex items-center justify-center ${className}`}
      style={{width: size, height: size}}
    >
      <span className="text-sm font-medium">{initials}</span>
    </div>
  );
};

const seedModels: ModelItem[] = [
  {
    id: 1,
    name: "Mia Santos",
    username: "@mia_santos",
    personality: {
      age: "25",
      location: "Los Angeles, CA",
      occupation: "Yoga Instructor & Content Creator",
      interests: ["Yoga", "Wellness", "Cooking", "Nature"],
      personality:
        "Sweet, caring, and health-conscious. Always positive and loves helping others feel good.",
      communicationStyle:
        "Warm and nurturing, uses heart emojis, focuses on wellness and positivity",
      background:
        "Certified yoga instructor who started content creation to share wellness tips and connect with like-minded people.",
      specialties: ["Yoga sessions", "Wellness advice", "Meditation content"],
    },
  },
];

// helper to make an empty model
const emptyModel = (): ModelItem => ({
  id: null,
  name: "",
  username: "",
  avatar: null,
  personality: {
    age: "",
    location: "",
    occupation: "",
    interests: [],
    personality: "",
    communicationStyle: "",
    background: "",
    specialties: [],
  },
});

// -----------------------------------------------------------------------------

export default function Models() {
  const [models, setModels] = useState<ModelItem[]>(seedModels);
  const [selectedId, setSelectedId] = useState<number | null>(seedModels[0]?.id ?? null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<ModelItem>(seedModels[0] ?? emptyModel());
  const [activeTab, setActiveTab] = useState<"basic" | "personality" | "background">("basic");
  const { toast } = useToast();

  const fileRef = useRef<HTMLInputElement>(null);

  const onPickAvatar = () => fileRef.current?.click();

  const onAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setForm((prev) => ({...prev, avatar: dataUrl}));
    };
    reader.readAsDataURL(file); // uložíme lokálne ako data URL (MVP)
  };

  const onRemoveAvatar = () =>
    setForm((prev) => ({...prev, avatar: null}));

  // filter left list
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return models;
    return models.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q)
    );
  }, [models, searchTerm]);

  // Handlers
  const selectModel = (m: ModelItem) => {
    setSelectedId(m.id);
    setForm(m);
    setActiveTab("basic");
  };

  const addNewModel = () => {
    const fresh = emptyModel();
    setSelectedId(null);
    setForm(fresh);
    setActiveTab("basic");
  };

  const updateField = (path: string, value: any) => {
    if (path.startsWith("personality.")) {
      const key = path.replace("personality.", "");
      setForm((prev) => ({
        ...prev,
        personality: { ...prev.personality, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [path]: value } as ModelItem));
    }
  };

  const handleSave = () => {
    // minimal validation
    if (!form.name.trim() || !form.username.trim()) {
      alert("Please fill in Name and Username.");
      return;
    }
    //TODO sem fetchovat
    if (form.id) {
      setModels((prev) => prev.map((m) => (m.id === form.id ? form : m)));
      setSelectedId(form.id);
    } else {
      const newId = Date.now();
      const created = {...form, id: newId};
      setModels((prev) => [...prev, created]);
      setSelectedId(newId);
      setForm(created);
    }
    
    // Show disclaimer toast
    toast({
      title: "Model Saved Successfully",
      description: "⚠️ This information will be saved and applied across all profiles using this model.",
      duration: 5000,
    });
  };

  // derived values for inputs that are arrays (interests)
  const interestsText =
    Array.isArray(form.personality.interests)
      ? form.personality.interests.join(", ")
      : (form.personality.interests as unknown as string) || "";

  return (
    <DashboardLayout>
      <div className="flex h-full gap-6">
        {/* LEFT: models list */}
        <div className="w-80 space-y-4">
          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Models</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                <Input
                  placeholder="Search models..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* list */}
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {filtered.map((m) => {
                  const isActive = selectedId === m.id;
                  return (
                    <button
                      key={m.id ?? `temp-${m.name}`}
                      onClick={() => selectModel(m)}
                      className={`w-full p-3 rounded-xl text-left transition ${
                        isActive
                          ? "bg-primary/30 text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar name={m.name} src={m.avatar} size={40}/>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{m.name || "Unnamed"}</p>
                          <p className={`text-sm truncate ${isActive ? "opacity-90" : "text-muted-foreground"}`}>
                            {m.username || "@username"}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <Button className="w-full rounded-xl" variant="outline" onClick={addNewModel}>
                <Plus className="w-4 h-4 mr-2"/>
                Add New Model
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: editor */}
        <div className="flex-1">
          <div className="space-y-6">
            {/* Header */}
            <Card className="bg-card/60 border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative group cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={onPickAvatar}
                      onKeyDown={(e) => e.key === "Enter" && onPickAvatar()}
                      aria-label="Upload profile photo"
                    >
                      <Avatar
                        name={form.name || "New Model"}
                        src={form.avatar}
                        size={64}
                        className="transition-transform group-hover:scale-105"
                      />

                      {/* overlay */}
                      <div
                        className="
      absolute inset-0 rounded-full
      bg-black/55 backdrop-blur-sm ring-1 ring-white/15
      opacity-0 group-hover:opacity-100
      flex items-center justify-center
      transition-opacity
    "
                      >
                        <div className="flex items-center gap-1.5 text-white">
                          <Camera className="w-4 h-4" />
                          <span className="text-[11px] font-medium leading-none">Upload</span>
                        </div>
                      </div>
                    </div>


                    {/* skrytý input */}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onAvatarChange}
                    />
                    <div>
                      <CardTitle className="text-xl">{form.name || "New Model"}</CardTitle>
                      <p className="text-muted-foreground">{form.username || "@username"}</p>
                    </div>
                  </div>
                  <Button onClick={handleSave} size="sm" className="rounded-xl">
                    <Save className="w-4 h-4 mr-2"/>
                    Save
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-xl">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
                <TabsTrigger value="background">Background</TabsTrigger>
              </TabsList>

              {/* BASIC */}
              <TabsContent value="basic" className="space-y-4">
                <Card className="bg-card/60 border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5"/>
                      <span>Basic Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}

                        />
                      </div>
                      <div>
                        <Label>Username</Label>
                        <Input
                          value={form.username}
                          onChange={(e) => updateField("username", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Age</Label>
                        <Input
                          value={form.personality.age}
                          onChange={(e) => updateField("personality.age", e.target.value)}

                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={form.personality.location}
                          onChange={(e) => updateField("personality.location", e.target.value)}
                          placeholder="Los Angeles, CA"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Occupation</Label>
                      <Input
                        value={form.personality.occupation}
                        onChange={(e) => updateField("personality.occupation", e.target.value)}
                        placeholder="Yoga Instructor & Content Creator"
                      />
                    </div>
                    <div>
                      <Label>Interests</Label>
                      <Input
                        value={interestsText}
                        onChange={(e) =>
                          updateField(
                            "personality.interests",
                            e.target.value
                          )
                        }
                        onBlur={(e) => {
                          const arr = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setForm((prev) => ({
                            ...prev,
                            personality: {...prev.personality, interests: arr},
                          }));
                        }}
                        placeholder="Yoga, Wellness, Cooking, Nature"
                      />
                    </div>


                  </CardContent>
                </Card>
              </TabsContent>

              {/* PERSONALITY */}
              <TabsContent value="personality" className="space-y-4">
                <Card className="bg-card/60 border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5"/>
                      <span>Personality & Communication</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Personality Description</Label>
                      <Textarea
                        className="min-h-[120px]"
                        value={form.personality.personality}
                        onChange={(e) =>
                          updateField("personality.personality", e.target.value)
                        }
                        placeholder="Describe personality traits and characteristics..."
                      />
                    </div>
                    <div>
                      <Label>Communication Style</Label>
                      <Textarea
                        className="min-h-[100px]"
                        value={form.personality.communicationStyle}
                        onChange={(e) =>
                          updateField(
                            "personality.communicationStyle",
                            e.target.value
                          )
                        }
                        placeholder="How does this model communicate?"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* BACKGROUND */}
              <TabsContent value="background" className="space-y-4">
                <Card className="bg-card/60 border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5"/>
                      <span>Background Story</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label>Background Story</Label>
                    <Textarea
                      className="min-h-[150px]"
                      value={form.personality.background}
                      onChange={(e) =>
                        updateField("personality.background", e.target.value)
                      }
                      placeholder="Tell the model's backstory..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
