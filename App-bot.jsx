import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Textarea } from "/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  applied: boolean;
  status: 'pending' | 'applied' | 'interviewing' | 'rejected' | 'accepted';
}

interface ApplicationStats {
  totalApplications: number;
  weeklyApplications: number;
  successRate: number;
  interviews: number;
}

export default function LinkedInJobAutomationApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'jobs' | 'analytics'>('dashboard');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('junior full stack developer');
  const [location, setLocation] = useState('Remote');
  const [isAutomationActive, setIsAutomationActive] = useState(false);
  const [autoApplyInProgress, setAutoApplyInProgress] = useState(false);
  const [lastAutoApply, setLastAutoApply] = useState<Date | null>(null);
  
  const [jobs] = useState<Job[]>([
    { id: '1', title: 'Junior Full Stack Developer', company: 'TechCorp', location: 'Madrid, Spain', salary: '€30,000 - €40,000', posted: '2 days ago', applied: true, status: 'applied' },
    { id: '2', title: 'Full Stack Developer Jr', company: 'StartupXYZ', location: 'Barcelona, Spain', salary: '€28,000 - €35,000', posted: '1 day ago', applied: true, status: 'interviewing' },
    { id: '3', title: 'Junior Web Developer', company: 'Digital Agency', location: 'Remote', salary: '€25,000 - €32,000', posted: '3 hours ago', applied: false, status: 'pending' },
    { id: '4', title: 'Graduate Full Stack Engineer', company: 'InnovateLab', location: 'Valencia, Spain', salary: '€32,000 - €38,000', posted: '1 day ago', applied: true, status: 'applied' },
    { id: '5', title: 'Junior Software Developer', company: 'CodeFactory', location: 'Sevilla, Spain', salary: '€26,000 - €33,000', posted: '4 hours ago', applied: false, status: 'pending' }
  ]);

  const [stats] = useState<ApplicationStats>({
    totalApplications: 47,
    weeklyApplications: 18,
    successRate: 23,
    interviews: 11
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const toggleAutomation = () => {
    setIsAutomationActive(!isAutomationActive);
    if (!isAutomationActive && cvFile) {
      startAutoApplyProcess();
    }
  };

  const startAutoApplyProcess = async () => {
    if (!cvFile) {
      alert('Por favor, sube tu CV primero en la sección de Configuración');
      return;
    }
    
    setAutoApplyInProgress(true);
    
    try {
      // Simular proceso de aplicación automática
      for (let i = 0; i < Math.min(5, jobs.filter(j => !j.applied).length); i++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos entre aplicaciones
        
        // Encontrar primer trabajo no aplicado
        const jobToApply = jobs.find(job => !job.applied);
        if (jobToApply) {
          await applyToJob(jobToApply.id);
        }
      }
      
      setLastAutoApply(new Date());
      alert('¡Aplicaciones enviadas exitosamente!');
    } catch (error) {
      console.error('Error en aplicación automática:', error);
      alert('Error al enviar aplicaciones. Revisa la configuración.');
    }
    
    setAutoApplyInProgress(false);
  };

  const applyToJob = async (jobId: string) => {
    // Aquí iría la lógica real para aplicar al trabajo
    // Por ahora simulamos el proceso
    
    const formData = new FormData();
    if (cvFile) {
      formData.append('cv', cvFile);
    }
    formData.append('coverLetter', coverLetter);
    formData.append('jobId', jobId);
    
    // Simular llamada a API de LinkedIn
    console.log(`Aplicando al trabajo ${jobId} con CV: ${cvFile?.name}`);
    
    // En una implementación real, aquí harías:
    // const response = await fetch('/api/apply-to-linkedin-job', {
    //   method: 'POST',
    //   body: formData
    // });
    
    return Promise.resolve();
  };

  const manualApplyToJob = async (jobId: string) => {
    if (!cvFile) {
      alert('Por favor, sube tu CV primero en la sección de Configuración');
      return;
    }
    
    try {
      await applyToJob(jobId);
      alert('¡Aplicación enviada exitosamente!');
    } catch (error) {
      alert('Error al enviar la aplicación');
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-800">Aplicaciones esta semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.weeklyApplications}/20</div>
            <div className="text-xs text-blue-600 mt-1">Objetivo: 20 semanales</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-800">Total Aplicaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{stats.totalApplications}</div>
            <div className="text-xs text-green-600 mt-1">Todas las aplicaciones</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-800">Entrevistas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.interviews}</div>
            <div className="text-xs text-purple-600 mt-1">Respuestas positivas</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-800">Tasa de éxito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{stats.successRate}%</div>
            <div className="text-xs text-orange-600 mt-1">Respuestas positivas</div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Estado de Automatización
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isAutomationActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isAutomationActive ? 'Activo' : 'Inactivo'}
            </div>
          </CardTitle>
          <CardDescription>
            La automatización está programada para aplicar a 20 puestos junior de full stack por semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Búsqueda Automática</h4>
                <p className="text-sm text-muted-foreground">
                  {autoApplyInProgress ? 'Aplicando automáticamente...' : 'Buscar y aplicar automáticamente a puestos junior'}
                </p>
                {!cvFile && (
                  <p className="text-sm text-red-600 mt-1">⚠️ Necesitas subir tu CV primero</p>
                )}
              </div>
              <Button 
                onClick={toggleAutomation}
                variant={isAutomationActive ? "destructive" : "default"}
                disabled={autoApplyInProgress || (!cvFile && !isAutomationActive)}
              >
                {autoApplyInProgress ? 'Aplicando...' : (isAutomationActive ? 'Pausar' : 'Iniciar')}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Próxima ejecución:</strong> {isAutomationActive ? 'En 2 horas' : 'Pausado'}
              </div>
              <div>
                <strong>Última ejecución:</strong> {lastAutoApply ? lastAutoApply.toLocaleString() : 'Nunca'}
              </div>
            </div>
            
            {autoApplyInProgress && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-blue-800">Aplicando automáticamente con tu CV...</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Aplicaciones Recientes</CardTitle>
          <CardDescription>Últimas aplicaciones enviadas automáticamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                  <p className="text-sm text-muted-foreground">{job.salary}</p>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'interviewing' ? 'bg-green-100 text-green-800' :
                    job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    job.status === 'accepted' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status === 'applied' ? 'Aplicado' :
                     job.status === 'interviewing' ? 'Entrevista' :
                     job.status === 'rejected' ? 'Rechazado' :
                     job.status === 'accepted' ? 'Aceptado' :
                     'Pendiente'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{job.posted}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      {/* CV Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Vitae</CardTitle>
          <CardDescription>Sube tu CV para que se envíe automáticamente con las aplicaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cv-upload">Archivo PDF del CV</Label>
            <Input 
              id="cv-upload" 
              type="file" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="mt-2"
            />
            {cvFile && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-600 font-medium">✓ {cvFile.name} subido correctamente</p>
                <p className="text-xs text-green-500 mt-1">Este CV se usará para todas las aplicaciones automáticas</p>
                <p className="text-xs text-green-500">Tamaño: {(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}
            {!cvFile && (
              <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded">
                <p className="text-sm text-orange-600 font-medium">⚠️ CV requerido para aplicación automática</p>
                <p className="text-xs text-orange-500 mt-1">Formatos aceptados: PDF, DOC, DOCX</p>
              </div>
            )}
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Información del CV</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Tu CV se enviará automáticamente con cada aplicación</p>
              <p>• Se combinará con la carta de presentación personalizada</p>
              <p>• Asegúrate de que esté actualizado y sea relevante para puestos junior</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cover Letter */}
      <Card>
        <CardHeader>
          <CardTitle>Carta de Presentación</CardTitle>
          <CardDescription>Carta de presentación personalizable que se enviará con cada aplicación</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Estimado/a responsable de selección,&#10;&#10;Me dirijo a ustedes para expresar mi interés en el puesto de desarrollador junior full stack. Soy un desarrollador apasionado con conocimientos en tecnologías web modernas como React, Node.js, y bases de datos.&#10;&#10;Espero poder contribuir al crecimiento de su equipo técnico.&#10;&#10;Saludos cordiales"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="min-h-32"
          />
        </CardContent>
      </Card>

      {/* Search Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Búsqueda</CardTitle>
          <CardDescription>Personaliza los criterios de búsqueda para encontrar los mejores puestos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="keywords">Palabras clave</Label>
            <Input
              id="keywords"
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
              placeholder="junior full stack developer, react, node.js"
            />
          </div>
          
          <div>
            <Label htmlFor="location-select">Ubicación</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remoto</SelectItem>
                <SelectItem value="Madrid">Madrid</SelectItem>
                <SelectItem value="Barcelona">Barcelona</SelectItem>
                <SelectItem value="Valencia">Valencia</SelectItem>
                <SelectItem value="Sevilla">Sevilla</SelectItem>
                <SelectItem value="Spain">Toda España</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <Button>Guardar Configuración</Button>
            <Button variant="outline">Probar Búsqueda</Button>
            <Button 
              variant="secondary" 
              onClick={startAutoApplyProcess}
              disabled={!cvFile || autoApplyInProgress}
            >
              {autoApplyInProgress ? 'Aplicando...' : 'Aplicar Ahora (5 trabajos)'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Empleos Encontrados</CardTitle>
          <CardDescription>Puestos junior de full stack encontrados automáticamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                    <p className="text-lg text-primary font-medium">{job.company}</p>
                    <p className="text-muted-foreground">{job.location}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'interviewing' ? 'bg-green-100 text-green-800' :
                      job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      job.status === 'accepted' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status === 'applied' ? 'Aplicado' :
                       job.status === 'interviewing' ? 'Entrevista' :
                       job.status === 'rejected' ? 'Rechazado' :
                       job.status === 'accepted' ? 'Aceptado' :
                       'Pendiente'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-green-600">{job.salary}</p>
                    <p className="text-sm text-muted-foreground">Publicado {job.posted}</p>
                  </div>
                  <div className="space-x-2">
                    {!job.applied && (
                      <Button 
                        size="sm" 
                        onClick={() => manualApplyToJob(job.id)}
                        disabled={!cvFile}
                      >
                        {!cvFile ? 'Necesita CV' : 'Aplicar Ahora'}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">Ver Detalles</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso Semanal</CardTitle>
          <CardDescription>Seguimiento de las aplicaciones de la semana actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Aplicaciones enviadas</span>
              <span className="text-sm text-muted-foreground">{stats.weeklyApplications}/20</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-300" 
                style={{ width: `${(stats.weeklyApplications / 20) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              <div className="p-2 bg-green-100 rounded">L<br/>3</div>
              <div className="p-2 bg-green-100 rounded">M<br/>4</div>
              <div className="p-2 bg-green-100 rounded">X<br/>2</div>
              <div className="p-2 bg-green-100 rounded">J<br/>5</div>
              <div className="p-2 bg-green-100 rounded">V<br/>4</div>
              <div className="p-2 bg-gray-100 rounded">S<br/>0</div>
              <div className="p-2 bg-gray-100 rounded">D<br/>0</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Respuesta</CardTitle>
            <CardDescription>Respuestas recibidas vs aplicaciones enviadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Respuestas positivas</span>
                <span className="text-sm font-medium text-green-600">11</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sin respuesta</span>
                <span className="text-sm font-medium text-gray-600">28</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Rechazos</span>
                <span className="text-sm font-medium text-red-600">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empresas Top</CardTitle>
            <CardDescription>Empresas con más aplicaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">TechCorp</span>
                <span className="text-sm font-medium">5 aplicaciones</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">StartupXYZ</span>
                <span className="text-sm font-medium">3 aplicaciones</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Digital Agency</span>
                <span className="text-sm font-medium">3 aplicaciones</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">InnovateLab</span>
                <span className="text-sm font-medium">2 aplicaciones</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Cronología de aplicaciones y respuestas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Invitación a entrevista - StartupXYZ</p>
                <p className="text-xs text-muted-foreground">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Aplicación enviada - CodeFactory</p>
                <p className="text-xs text-muted-foreground">Hace 4 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Aplicación enviada - TechCorp</p>
                <p className="text-xs text-muted-foreground">Hace 1 día</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">LinkedIn Job Automation</h1>
              <p className="text-muted-foreground">Automatización de aplicaciones a puestos junior full stack</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAutomationActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isAutomationActive ? '🟢 Activo' : '🔴 Pausado'}
              </div>
              <Button variant="outline" size="sm">
                Configuración
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              Empleos
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              Análisis
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              Configuración
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'jobs' && renderJobs()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>

      {/* Footer */}
      <div className="border-t bg-card mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Aplicación de automatización para LinkedIn • Configurado para aplicar a 20 puestos junior por semana
            </p>
            <p className="text-xs mt-2">
              Recuerda revisar las aplicaciones manualmente y personalizar cuando sea necesario
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}