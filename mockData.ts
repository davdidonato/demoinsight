export const MOCK_TRANSCRIPT = `21 gen 2026
Datadog <> RenewCast - Observability Demo - Trascrizione
00:00:00
 
Davide Di Donato: Ciao Alessandro, buongiorno, come stai?
Alessandro Peyrachia: Tutto bene? Tu sei in ufficio?
Davide Di Donato: Bene, bene, dai.
Alessandro Peyrachia: No.
Davide Di Donato: Sono in ufficio adam in una di questi pod minuscoli
Alessandro Peyrachia: Ah,
Davide Di Donato: dove
Alessandro Peyrachia: bene, molto bene.
Enrico Portolan: Ciao.
Alessandro Peyrachia: Ciao Enrico, buongiorno, piacere.
Davide Di Donato: verso metà chiamata inizierò a aprire la porta perché qua diventa una sauna dopo un'ora.
Enrico Portolan: Aspetta.
Davide Di Donato: Non l'hanno non l'hanno progettati molto bene questi pod, però vabbè. Eh, aspettiamo anche Marco per caso o non riesce a venire?
Alessandro Peyrachia: Eh, scusami. No, Marco è malato oggi, eh, c'è un une catombe di di malati ultimamente tra questa settimana e la precedente. Siamo già siamo pochi, siamo a ranghi ridottissimi.
Davide Di Donato: Ah,
Alessandro Peyrachia: Comunque partiamo pure.
Davide Di Donato: peccato.
Alessandro Peyrachia: Sì, vabbè,
Davide Di Donato: Va bene,
Alessandro Peyrachia: poi gli racconto io. Partiamo, partiamo tranquilli
Davide Di Donato: magari sì, sì, facciamo insieme, se vuoi un recap di di quello che è importante e poi eh tramite te gliel facciamo vedere.
 
 
00:00:53
 
Alessandro Peyrachia: tanto
Davide Di Donato: Ok. Ehm, va bene. Eh, giusto un minuto di presentazioni. Alessandro ci siamo sentiti eh quando era un mesetto fa, penso ormai.
Alessandro Peyrachia: sì.
Davide Di Donato: eh un po' di più forse eh su appunto quello che è il progetto di
Alessandro Peyrachia: Eh sì.
Davide Di Donato: Renewcast eh per quanto riguarda il monitoraggio al momento eh abbiamo fatto un paio di conclusioni eh per appunto delle situazioni che che si si vengono a a creare adesso per quanto riguarda l'utilizzo magari di diversi tool per fare delle cose adiacenti che Datad poi alla fine può centralizzare e può unire e quindi oggi andremo a vedere insomma, questo progetto principale e molte altre cose che Enrico che Enrico ti farà vedere. Infatti presento Enrico che è il nostro Solution Architect.
Enrico Portolan: Ciao. Ciao Alessandro,
Alessandro Peyrachia: Ciao,
Davide Di Donato: Ok,
Enrico Portolan: piacere.
Alessandro Peyrachia: piacere.
Davide Di Donato: io passo passo la palla a Enrico. Se c'è qualsiasi domanda, magari prima di iniziare qualcosa a livello di impostazione, qualsiasi cosa, fammi sapere e ovviamente se se vuoi interrompere nel frattempo fai senza problemi. E Enrico, ti dicevo già Alessandro ha già usato Datal Dog nel passato,
Enrico Portolan: Sì.
 
 
00:02:10
 
Davide Di Donato: quindi eh insomma
Alessandro Peyrachia: Sì, qualcosina. Eh,
Enrico Portolan: Quanti quanto tempo fa più o meno?
Davide Di Donato: Ok.
Alessandro Peyrachia: eh. Un annetto e mezzo fa, credo.
Enrico Portolan: Ok,
Alessandro Peyrachia: Sì,
Enrico Portolan: quindi hanno aggiunto un po' di cose,
Alessandro Peyrachia: circa un anno e mezzo fa. Sì. Eh,
Enrico Portolan: un po' di cose nuove ci sono.
Alessandro Peyrachia: sì,
Enrico Portolan: E mi diceva Davide, quindi che l'ambiente è tutto su su Asure, giusto?
Alessandro Peyrachia: sì,
Enrico Portolan: con Kubernetis e eh diciamo le cose principali che
Alessandro Peyrachia: praticamente tutto. Sì.
Enrico Portolan: stavi raccontando lui sono uno ovviamente cercare magari di centralizzare tutto in
Alessandro Peyrachia: Ok,
Enrico Portolan: una singola piattaforma, poi la questione quella di datab che vorresti migrare a airflow
Alessandro Peyrachia: allora sì, adesso stiamo stiamo iniziando a lavorare per migrare Datab verso airflow e al momento su databaks abbiamo del monitoraggio con embed di databs, quindi vai a vederti il job e guardi cosa cosa ha fatto. Non c'è niente di particolare.
Enrico Portolan: Ok.
Alessandro Peyrachia: Abbiamo poi settato noi delle delle qui per con delle thell specifiche per vedere se qualcosa si rompe oppure se andiamo fuori quota o cose del genere.
 
 
00:03:10
 
Alessandro Peyrachia: Quindi non è che abbiamo un grande monitoraggio. Ehm quello che vogliamo fare è appunto è uscire da Ratabrix e cominciare a usare Airflow per orchestrare i nostri job. Airflow sarà sarà è già postato all'interno di Cubernetes, quindi soluzione KS di di Eju, niente di homem madeade, è già già un lavoro abbastanza complicato così.
Enrico Portolan: Okay.
Alessandro Peyrachia: Ehm e niente, quindi la parte di di observability e sarà principalmente basata su cubernetes, cioè sarà basata sarà principalmente l'oggetto principale sarà Cubernetes perché poi abbiamo oltre alla parte di workflow e quant'altro c'è poi la parte di applicazione front-end è un portale di dove i clienti possono collegarsi, guardare eh le metriche del dei loro plant, scaricare i report, in generale report, quindi vabbè,
Enrico Portolan: Ok.
Alessandro Peyrachia: un'applicazione tre tire normalissima, niente di esagerato e basta. E poi quindi diciamo che il la visibilità che vorremmo avere dentro
Enrico Portolan: Ok.
Alessandro Peyrachia: Cubernetes, dentro l'applicazione, se c'è qualcosa per Airfow interessante eventualmente aggiungere qualcosa sulla sulla cloud, sulla parte cloud, quindi sottoscrizione e quant'altro.
Enrico Portolan: Ok. E lato, quindi anche lato frontend ti ti ti può interessare avere visibilità?
 
 
00:04:30
 
Alessandro Peyrachia: Sì, sì, abbiamo Sì, abbiamo adesso abbiamo cominciato a mettere Open Telemetry per vedere un po' eh
Enrico Portolan: Ok.
Alessandro Peyrachia: adesso abbiamo ho abbiamo preparato due installazioni di già di qualcosa di observability monitoraggio per avere un'idea di cosa vogliamo fare perché sennò non cioè non sapevamo neanche da dove partire e quindi stiamo tracciando un po' con pentelemetri eh le solite cose e quindi sì, ci ovviamente ci interessa avere visibilità sia sul frontend che
Enrico Portolan: M ok,
Alessandro Peyrachia: suckend.
Enrico Portolan: perfetto.
Davide Di Donato: La visibilità se che avete adesso sul front-end è più a livello di monitoraggio utente reale o
Enrico Portolan: Co?
Davide Di Donato: anche di
Alessandro Peyrachia: No, no,
Davide Di Donato: test?
Alessandro Peyrachia: solo solo come si chiama, solo le metriche interne del front-end.
Davide Di Donato: Ah, ok,
Alessandro Peyrachia: Quindi non c'è non c'è la parte di user,
Davide Di Donato: ok.
Enrico Portolan: Quindi cos'è?
Alessandro Peyrachia: ma diciamo monitoring user,
Enrico Portolan: Tempo di mh mh tempo di caricamento,
Alessandro Peyrachia: scusa. Sì,
Enrico Portolan: quelle cose lì.
Alessandro Peyrachia: quelle cose metriche classiche di insomma quello che può fare è un frontend statico in React,
 
 
00:05:22
 
Enrico Portolan: Ok.
Alessandro Peyrachia: quindi non cioè non c'è molto molto da dire,
Enrico Portolan: Ok.
Alessandro Peyrachia: insomma, abbiamo
Enrico Portolan: Quindi i vostri clienti, giusto per capire,
Alessandro Peyrachia: strumentato.
Enrico Portolan: sono poi quelli nelle varie, diciamo, centrali che usano il portale e e capiscono cosa devono fare.
Alessandro Peyrachia: Sì. Allora, il nostro cliente tipo è un, diciamo, una una persona del business del produttore energetico che eh verifica appunto dati di produzione e dati di predizione, soprattutto, visto che noi facciamo quello, predizione della produzione.
Enrico Portolan: Sì.
Alessandro Peyrachia: Ehm, quindi è un utente sulla questione di energetica, ma non è un utente tecnico, diciamo, sulla parte informatica magari, no? Quello che ci interessa a noi è che il portale sia semplice da vedere e sostanzialmente nel portale ci sono due cose da guardare,
Enrico Portolan: Co?
Alessandro Peyrachia: i grafici, quindi abbiamo abbiamo un portale che disegna grafici e quindi bisogna vedere quello che ci interessa vedere è come risponde il portale nel caricamento del Time Series per creare il il grafico,
Enrico Portolan: Ok.
Alessandro Peyrachia: per esempio. E poi la seconda parte è quella di gestione invece degli export delle dei report e quelle cose lì che sono cose che vengono mandate o tramite STTP o mandate tramite altre modalità.
 
 
00:06:39
 
Alessandro Peyrachia: Eh e quindi diciamo queste due parti principali entrambe si appoggiano sulle PI che ovviamente va a fare l'interrogazione dietro eh sui nostri database su dove ci sono tutta la parte di tutti i dati che vengono lavorati dal dai modelli di machine learning. Quindi quello che ci interessa alla fine è vedere front-end, vedere l'PI come risponde. L'PI può essere chiamata dal front-end oppure può essere chiamata dal cliente direttamente se non vuole usare il front-end.
Enrico Portolan: Ah,
Alessandro Peyrachia: Quindi ci sono l'aspetto è lo stesso,
Enrico Portolan: ok. Ok, ok.
Alessandro Peyrachia: è un è un front è un backend classico che può erog eroga i dati sia al frontend che al cliente direttamente e non ci sono giri strani all'interno,
Enrico Portolan: Ottimo,
Alessandro Peyrachia: è tutto trasparente. Quindi quello che vogliamo vedere appunto è come reagisce il backend,
Enrico Portolan: ottimo.
Alessandro Peyrachia: il front end comporta con il cliente e basta, sostanzialmente quello. Poi se se riusciamo a vedere qualcosina, in realtà con Opel Telemetry abbiamo già strumentato qualcosa sul backend, vediamo anche la parte Postgress, quindi dietro abbiamo un Postgress ovviamente,
Enrico Portolan: Ok.
Alessandro Peyrachia: quindi vediamo come girano le chiamate e quant'altro.
 
 
00:07:39
 
Enrico Portolan: Ok.
Alessandro Peyrachia: Quindi insomma questo l'ambito è
Enrico Portolan: Poi se se diciamo eh l'open telemetry sano
Alessandro Peyrachia: quello.
Enrico Portolan: requisito eh è anche supportato su su datog, anzi sono pare che sia il terzo contributor a livello mondiale su su quel progetto,
Alessandro Peyrachia: Sì, sì, sì, sì.
Enrico Portolan: quindi non non è un problema. Allora, eh magari possiamo iniziare da faccio vedere, faccio magari un refresh di come si integra e e poi ti faccio vedere quelle parti che appunto mi hai scritto tu. quindi monitoraggio infrastruttura cibernetis.
Alessandro Peyrachia: Sì.
Enrico Portolan: Abbiamo anche un modulo dedicato ai detta jobs sia che sia su datab che su airflow, quindi vedere anche quello. E poi appunto tutta la parte di correlazione tra APM, front-end, eccetera eccetera.
Alessandro Peyrachia: Ok.
Enrico Portolan: Eh,
Alessandro Peyrachia: Ok.
Enrico Portolan: ok, top. Come diceva Davide, se hai domande bloccami pure,
Alessandro Peyrachia: Sì, sì,
Enrico Portolan: non ho non è un problema.
Alessandro Peyrachia: sì. Ok. Vai,
Enrico Portolan: Ok,
Alessandro Peyrachia: vai pure a ruota libera, io chiedo
Enrico Portolan: ok, ok. Tranquillo.
 
 
00:08:39
 
Enrico Portolan: Allora, ehm, non se ti ricordi stanza per partire con l'integrazione di dato due step principali, quindi la parte di integrazione che comprende sia integrazioni basate su API, la classica nel vostro caso sarebbe quella di Azure.
Alessandro Peyrachia: Sì,
Enrico Portolan: Quello che fa è che si crea un taanto,
Alessandro Peyrachia: sì,
Enrico Portolan: adesso mi ricordo,
Alessandro Peyrachia: la
Enrico Portolan: app registration su eh su Azure e quello che fa alla fine è
Alessandro Peyrachia: progresion
Enrico Portolan: pullare delle metriche dal dal vostro account. Ovviamente è tutto configurabile, quindi posso selezionare quali servizi.
Alessandro Peyrachia: cosa prendere, quale no. Ok,
Enrico Portolan: Esatto.
Alessandro Peyrachia: ottimo.
Enrico Portolan: Posso fare sia a livello di servizio global, diciamo,
Alessandro Peyrachia: Sì.
Enrico Portolan: o anche se voglio magari voglio solo fare dei filtri di inclusione esclusione per certi host. Esempio classico è voglio solo gli host prodare.
Alessandro Peyrachia: Sì. Ok.
Enrico Portolan: Faccio un filtro che può chiamare un datogg true e prende solo quelli. Ok?
Alessandro Peyrachia: Ok.
Enrico Portolan: Quindi posso fare usare entrambi entrambi i metodi.
Alessandro Peyrachia: Perfetto.
Enrico Portolan: Questo appunto è PAS.
 
 
00:09:37
 
Enrico Portolan: Ci sono altre integrazioni che sono eh basate sul datad agent. Quindi l'unica cosa da fare è aggiungere un piccolo file YamL per raggiungere quell'integrazione. Ad esempio, mi sa che Airfow funziona così. Quindi se voglio pullare le metriche di airflow, quello che dovrò fare è dirgli in sostanza alle agent, senti, connettiti qua.
Alessandro Peyrachia: Sì,
Enrico Portolan: Ok,
Alessandro Peyrachia: ma giravo zitto.
Enrico Portolan: quindi stessa cosa per iB queste cose qui. Quindi questi, diciamo, sono parti di integrazione, sono tra l'altro tutte sviluppate da da Datado, quindi anche se ci sono problemi il team di supporto può aiutare. Sono adesso sono più di 1000, però di base ne aggiungono sempre di nuove ogni settimana.
Alessandro Peyrachia: Ok.
Enrico Portolan: Ehm, questo primo step, diciamo quello più immediato. Il secondo eh è quello del dell'agente del datog agent,
Alessandro Peyrachia: Sì,
Enrico Portolan: quindi nel vostro caso sarà full su cubernetisure e
Alessandro Peyrachia: sì, sì, sì.
Enrico Portolan: funziona principalmente con Esatto con l'operator o puoi usare
Alessandro Peyrachia: Certello.
Enrico Portolan: anche ch se preferisci,
 
 
00:10:43
 
Alessandro Peyrachia: Sì, sì, sì,
Enrico Portolan: però alla fine vedo Esatto.
Alessandro Peyrachia: sì. Tanto uguale più o
Enrico Portolan: Esatto. Identico qua, eh. Eh, tu cos'è che fai?
Alessandro Peyrachia: meno.
Enrico Portolan: Decidi cosa vuoi far monitorare alla gente. Quindi voglio fare solo infrastruttura, voglio fare anche la PM, voglio fare i log. Ehm, questo livello generale. Poi ovviamente eh so che avate discusso velocemente di security, poi magari ce lo teniamo per una prossima call, eventualmente c'è anche una parte di di security fatta dall'agen.
Alessandro Peyrachia: Ok.
Enrico Portolan: Eh, qui vedi il nostro amico Open Telemetry, quindi se vuoi fa anche da collector di di Open Telemetry,
Alessandro Peyrachia: Sì. Ok. Ottimo.
Enrico Portolan: poi quello magari di nuovo lo discutiamo nel dettaglio più avanti. Qual è l'idea? Che appunto lui ti crea un file di configurazione da applicare poi a quell'operator di prima e fa tutto lui,
Alessandro Peyrachia: Sì,
Enrico Portolan: no?
Alessandro Peyrachia: sì, sì,
Enrico Portolan: Quindi fa monitoraggio infra,
Alessandro Peyrachia: sì,
Enrico Portolan: il tracing dell'applicazione, non deve aggiungere niente lato codice, lato applicativo,
 
 
00:11:42
 
Alessandro Peyrachia: ok.
Enrico Portolan: cos'è che usate su diciamo come Python?
Alessandro Peyrachia: Python è tutto Python al momento,
Enrico Portolan: Ok, quindi,
Alessandro Peyrachia: poi chi lo sa, però adesso Python ci sta. Ce la facciamo con
Enrico Portolan: ok, ok, ottimo.
Alessandro Peyrachia: Python.
Enrico Portolan: Eh, quindi di base questo lui cos'è che fa? Crea, probabilmente, lo sai già, un agent per ogni nodo e da lì fa,
Alessandro Peyrachia: Sì.
Enrico Portolan: ok, il monitoraggio e quindi,
Alessandro Peyrachia: Ok,
Enrico Portolan: diciamo, questi due step abbiamo fatto e iniziamo ad avere dei dati che arrivano in datalook. Ehm,
Alessandro Peyrachia: lì nella configurazione posso posso decidere eventualmente se mettere in
Enrico Portolan: Questo St.
Alessandro Peyrachia: whitist solo alcuni nam space, per esempio, prendere solo un certo tipo di oggetti, che so, voglio solo i log dei pod o i log di boh,
Enrico Portolan: Sì,
Alessandro Peyrachia: i deployment che si chiamano così. Ah, ok, perfetto.
Enrico Portolan: sì,
Alessandro Peyrachia: Ok. Target space. Ok,
Enrico Portolan: hai sia namespace sia per i log puoi usare sia il nome
Alessandro Peyrachia: ok,
 
 
00:12:37
 
Enrico Portolan: del del pod, il nome dell'immagine o di nuovo il namespace.
Alessandro Peyrachia: ok.
Enrico Portolan: Puoi fare anche eh Sì,
Alessandro Peyrachia: Un mix.
Enrico Portolan: logiche inclusione,
Alessandro Peyrachia: Ok,
Enrico Portolan: esclusione. Puoi fare quello che vuoi.
Alessandro Peyrachia: ok, perfetto. Quindi sì,
Enrico Portolan: Ok.
Alessandro Peyrachia: posso tunare quello che mi serve solo, visto che i poi che scrivono di più dentro sono quelli di Asure, che francamente mi interessa fino a un certo
Enrico Portolan: Sì, sì,
Alessandro Peyrachia: punto.
Enrico Portolan: puoi anche usare regular expression per togliere tipo tutti quelli che iniziano per, non so, A C non mi interessano per dire.
Alessandro Peyrachia: Ok,
Enrico Portolan: ed è è comodo perché lo fai tutto da qui poi,
Alessandro Peyrachia: ottimo,
Enrico Portolan: quindi hai un posto centralizzato in cui puoi fare questi questi cambi.
Alessandro Peyrachia: ottimo.
Enrico Portolan: Ehm Ok, poi da qui direi possiamo andare a vedere la parte di infrastruttura. Quindi abbiamo installato l'agent, abbiamo messo le integrazioni, la prima parte interessante è l'overview sull'ambiente eh di Cubernetis.
Alessandro Peyrachia: Sì.
Enrico Portolan: Quindi qua tu vedi tutti i tuoi nodi, i tu space, i cluster, qui ti fa l'analisi dei costi, eh puoi legarlo sia al building di Azure o usa dei benchmark, diciamo, di di mercato,
 
 
00:13:43
 
Alessandro Peyrachia: Ok.
Enrico Portolan: però magari ci concentriamo sulla parte di eh trouble shooting e ottimizzazione delle risorse. Quindi di base c'ha lui ti dà dei template su non so pod magari che si stanno reviando o deployment che non hanno delle repliche, insomma, ti dà un po' un po' di scenari, no, in come idea.
Alessandro Peyrachia: Sì.
Enrico Portolan: Poi ovviamente nel day today,
Alessandro Peyrachia: Ok.
Enrico Portolan: diciamo, non sto a guardare tutto da tempo il le dashboard o questo overview, quello che diciamo è comodo che di base lui ti crea in automatico dei monitoraggi, ovviamente in base a quello che hai installato. Nel nostro caso abamo installato Cubernetis,
Alessandro Peyrachia: Ok.
Enrico Portolan: quindi lui ti eh ti genera questi template, quindi su di nuovo nodi non disponibili dei PO,
Alessandro Peyrachia: Sì. Grazie. classiche metriche.
Enrico Portolan: esatto. classiche metriche poi tu con un click puoi configurare e decidere cosa fare.
Alessandro Peyrachia: Ok.
Enrico Portolan: Se vuoi farlo su una basato su una threshold fissa, se usare normal detection, insomma, puoi fare vari tipi di di monitoraggi.
Alessandro Peyrachia: Ok.
Enrico Portolan: Ok?
Alessandro Peyrachia: Interessante
Enrico Portolan: Ehm, ovviamente poi quando ricevi la notifica,
 
 
00:14:49
 
Alessandro Peyrachia: questo.
Enrico Portolan: ti faccio vedere dopo un po' meglio come funzionano il monitoraggio, hai esattamente l'indicazione di cosa è fallito. In sostanza lui risolve delle variabili, quindi ti dice qual è il pod che ha avuto il problema.
Alessandro Peyrachia: C'è problema.
Enrico Portolan: Ok,
Alessandro Peyrachia: Ok.
Enrico Portolan: quindi questo diciamo come overview principale di nuovo, eh tieni conto che per ehm gli ambienti che abbiamo installato,
Alessandro Peyrachia: Ok.
Enrico Portolan: quelle integrazioni che hai visto all'inizio, lui in automatico ti genera dei template anche a livello di dashboard. Quindi eh tu le avevi usate nei dashboard su Datadog prima?
Alessandro Peyrachia: Sì, sì,
Enrico Portolan: Sì.
Alessandro Peyrachia: sì, sì.
Enrico Portolan: Ok.
Alessandro Peyrachia: Ho ho già usato qualcosina. Sì,
Enrico Portolan: Ok. Ottimo.
Alessandro Peyrachia: sì,
Enrico Portolan: Quindi da qui tu hai dei template comodi e per qualsiasi grafico puoi cliccare, andare a vedere quali sono gli host,
Alessandro Peyrachia: sì.
Enrico Portolan: quali sono le trace che stanno provocando questo problema. Quindi, già da qui vedi tutta quella parte di eh diciamo correlazione che stavamo discutendo all'inizio.
Alessandro Peyrachia: Ottimo.
 
 
00:15:49
 
Alessandro Peyrachia: Sì, sì, altrimenti diventa un macello gestire capire cosa succede.
Enrico Portolan: Eh
Alessandro Peyrachia: È già è impossibile senò senza correlazione dentro Kubernetes capire, però va bene,
Enrico Portolan: esatto. Ma tu fai solo la parte,
Alessandro Peyrachia: ottimo.
Enrico Portolan: diciamo, devo o ti occupi anche poi dello sviluppo applicativo?
Alessandro Peyrachia: Io non sono uno sviluppatore, ma faccio tutto il resto,
Enrico Portolan: Ok. Ok.
Alessandro Peyrachia: quindi faccio il DevOps molto più che,
Enrico Portolan: Ottimo.
Alessandro Peyrachia: cioè il DevOps veramente a ad ampissimo spettro. Non sviluppo,
Enrico Portolan: Ok.
Alessandro Peyrachia: scrivo codice anch'io perché tanto ormai tutti scriviamo codice, eh, però non sono uno sviluppatore,
Enrico Portolan: Sì.
Alessandro Peyrachia: quindi backend e frontend non li non li scrivo io, non scrivo i il codice che generano le modelli machine learning, non scrivo quelle cose lì, però scrivo altro codice che mi serve per gestire magari infrastruttura o eseguire
Enrico Portolan: Ok.
Alessandro Peyrachia: report, trashing,
Enrico Portolan: Ok.
Alessandro Peyrachia: tutte quelle
Enrico Portolan: Ok, ok, perfetto.
Alessandro Peyrachia: così.
Enrico Portolan: Perché appunto anche quello saranno poi la parte di dashboard di correlazione,
 
 
00:16:45
 
Alessandro Peyrachia: Sì.
Enrico Portolan: perché se il developer ti dice guarda che le PI è andate in errore, sicuramente il pod che è esploso, tu vai lì, vedi la trace e dici "No, questo pod stava bene perché ho visto la metrica già già correlata".
Alessandro Peyrachia: Sì, sì, sì. Questo nella nella mia idea,
Enrico Portolan: Ehm M.
Alessandro Peyrachia: tanto siamo quattro gatti e poi un un tool che devono poter utilizzare tutti quanti, quindi eh non mi ricordo. Eh ci sono si fa un team e si tirano dentro le persone, immagino, eh dentro un certo account,
Enrico Portolan: Esatto,
Alessandro Peyrachia: quindi non c'è non ci sono problemi di questo genere.
Enrico Portolan: esatto. Tieni conto che anche uno delle degli obiettivi di datog non è appunto lo vedi anche già dalle licenze,
Alessandro Peyrachia: Ok.
Enrico Portolan: quindi le licenze non sono per user, ma è per numero di di host principalmente.
Alessandro Peyrachia: Sì, sì.
Enrico Portolan: Poi ovviamente David te lo spiegherà,
Alessandro Peyrachia: Ok.
Enrico Portolan: però l'idea appunto è far lavorare i vari team insieme, quindi avere puoi aggiungere gli user che vuoi, li puoi organizzare per team e poi da lì lavorate insieme su app, DevOps, log in base a quello che che vi serve.
 
 
00:17:41
 
Alessandro Peyrachia: Perfetto. Ottimo.
Enrico Portolan: Ehm, poi c'è la pagina di Explorer che eh ti fa vedere tutti i pod attivi quasi su in in real time e puoi vedere sia sotto il punto di vista dei pod, dei nodi, in base in base a quello che ti serve. Ehm, hai dei filtri sulla sinistra per andare a filtrare ovviamente quello che vuoi andare a cercare, sia su vari tag che può prendere sia dall'ambiente Ager che è già,
Alessandro Peyrachia: Sì.
Enrico Portolan: quindi replica quei tag che che ha lui o anche dei tag estratti, diciamo, dal dalla gente. Se voglio andare a farti un esempio, magari di un pod che contiene un applicativo,
Alessandro Peyrachia: Ok.
Enrico Portolan: ad esempio, io so che questo servizio di Rubion Race è su questi pod e ho bisogno di andare a vedere uno lo stato del pod e se
Alessandro Peyrachia: Sì.
Enrico Portolan: ci sono chiamate a livello di APM, se ci sono dei log. io lo posso fare direttamente da qui. Quindi qui vedo il il pod che mi sta sta eseguendo il mio applicativo, la configurazione del podlo eh cambia
Alessandro Peyrachia: Sì.
Enrico Portolan: poco. Qui posso vedere dov'è nel mio, diciamo, nella mia architettura Cubernetis.
 
 
00:18:53
 
Alessandro Peyrachia: Ok.
Enrico Portolan: Credo che su questo cluster questo è il mio nodo e questi sono i container di eh di questo pod, anzi i processi. In questo caso il container è questo qui. Qui hai quelle metriche a livello di macchina che come dicevo all'inizio, quindi classiche CPU, memoria eccetera eccetera,
Alessandro Peyrachia: Sì.
Enrico Portolan: ma nella stessa schermata se vuoi puoi anche vedere l'applicativo, quindi tutte le API, call o insomma le richieste che arrivano al servizio che sta eseguendo il mio pod.
Alessandro Peyrachia: Ok.
Enrico Portolan: Quindi dico qua, immagine che sia il tuo web app di di Python,
Alessandro Peyrachia: Sì, sì, sì.
Enrico Portolan: eh, e da qui puoi dire "Ok, qua è tutto ok, se voglio posso filtrare per quelle che falliscono, per dire, e quindi da qui me le vedo tranquillamente nella stessa pagina." Ok?
Alessandro Peyrachia: Ok.
Enrico Portolan: Stesso discorso per i log, quindi stessa idea. Poi ti faccio vedere un esempio anche per quanto riguarda i log. E un'altra cosa che vedo utilizzare spesso è abbiamo un modulo di travel shooting, quindi in questo caso è un pod running, però potremmo fare un esempio di un pod che è in errore, quindi eh se ho magari degli errori su dei pod,
Alessandro Peyrachia: Ah, quo
 
 
00:20:06
 
Enrico Portolan: lui ti può far vedere ad esempio dove sta esplodendo. In questo caso, ok? è il container che è riavviato molte volte o eh magari è il prob livess che non che non funziona.
Alessandro Peyrachia: Ok,
Enrico Portolan: Insomma, vedi eh per ogni ehm risorsa dentro CNT riesci a vedere dove sta fallendo e ti spiega anche perché. Ok?
Alessandro Peyrachia: ottimo. Buono. Sì, sì.
Enrico Portolan: Ehm quindi questo e in più di nuovo c'è anche la parte di quei monitor che hai fatto vedere prima. Eh, se vuoi ovviamente sono targetizzati anche sul sul singolo pod, quindi tu qua sai che infatti se questo in OM killed ti arriva
Alessandro Peyrachia: Mh.
Enrico Portolan: questa notifica con il suo podname, quindi hai diciamo
Alessandro Peyrachia: Ok, ottimo. Sì, così vedo vedo cosa si sta rompendo. Ottimo. Fa qualche aggregazione anche a livello di, non so, tipo di applicazione che magari io posso definire un'applicazione custom con dentro 4- C pod, insomma, cose del genere. Eh, quello che che a volte è più interessante vedere la appunto la correlazione che c'è magari tra due pod
Enrico Portolan: Sì.
 
 
00:21:16
 
Alessandro Peyrachia: all'interno della stessa applicazione. Adesso, nel nostro caso fa ridere perché sono tre pod l'applicazione con più repliche,
Enrico Portolan: Ok.
Alessandro Peyrachia: però sai, prima o poi qualcuno vorrà tirare fuori un pezzo dell'applicazione e trasformarli in un microservizio,
Enrico Portolan: Chiaro.
Alessandro Peyrachia: quindi
Enrico Portolan: Certo. Sì. Sì, la puoi fare in diversi modi.
Alessandro Peyrachia: tanto
Enrico Portolan: Il più semplice, ti direi, ti definisci tu una tag dentro quei deployment in
Alessandro Peyrachia: Sì.
Enrico Portolan: cui si chiama, non so, applicativo XY e quindi TUC può anche raggruppare per dire per vediamo se lo faccio ad esempio
Alessandro Peyrachia: Sì.
Enrico Portolan: per servizio, solo che qui ne avrò tantissimi, quindi qua io ho tutti quanto. Questa è la mia applicazione di questo è un e-commerce in sostanza questo è un DNET di authentication.
Alessandro Peyrachia: Sì.
Enrico Portolan: Io qua posso vedere tutti i pod che fanno riferimento a quell'app. Nel tuo caso fai la stessa cosa, però metti una label, anzi scusami, una label su eh il pod, quello che fa il DB, quello che fa l'applicativo, quello che ti fa, non so,
Alessandro Peyrachia: Sì.
 
 
00:22:14
 
Enrico Portolan: il job e lo puoi usare sia come group buy, oppure puoi dire eh app, ad esempio, se c'era quello di app, esatto, app, la tua,
Alessandro Peyrachia: Ok,
Enrico Portolan: filtrami solo i pod di quell'app, quindi lo puoi fare in quel in quel modo lì.
Alessandro Peyrachia: ok, ottimo. Ok,
Enrico Portolan: Ok?
Alessandro Peyrachia: si può fare.
Enrico Portolan: Tieni conto che tutto è tutto basato su sui tag che aggiung ne puoi aggiungere quanti
Alessandro Peyrachia: Sì.
Enrico Portolan: quanti ne vuoi. Magari già dal nodo dal cluster riesci a avere una visualizzazione secondo me e su quella su quell'applicazione che dicevi tu oppure definisci tu una
Alessandro Peyrachia: Ok,
Enrico Portolan: custom.
Alessandro Peyrachia: ci sta. Sì, sì.
Enrico Portolan: Ok.
Alessandro Peyrachia: Insomma, ovviamente è customizzato, nessuno sa la la struttura delle proprie applicazioni, meglio di noi, quindi è importante che si possa fare.
Enrico Portolan: Esatto, esatto. Poi tieni conto che a proposito di questo,
Alessandro Peyrachia: Perfetto.
Enrico Portolan: se eh io torno un attimo su questa app, perché so che è l'unica che c'ha dei dati decenti in questo ambiente, tieni conto che quella cosa che mi stavi dicendo tu adesso lo puoi vedere anche dalla PM,
 
 
00:23:21
 
Alessandro Peyrachia: Sì.
Enrico Portolan: perché se io apro l'applicazione lui cos'è che fa? mi genera uno. Eh, qui ho cliccato dal pod applicativo al modulo di APM, no? Quindi monitoraggio applicativo. Da qui lui cos'è che fa?
Alessandro Peyrachia: Sì.
Enrico Portolan: Analizzando il traffico ti crea già un graffo di dipendenze. Ok? Quindi io qui posso vedere fai finta che questo è il tuo Python web server e
Alessandro Peyrachia: Ok. Sì.
Enrico Portolan: qua c'hai la questo è il web UI nostro, quindi il nostro e-commerce. Questo sarà il tuo che è il l'APSAM. Parla col mio web server. E qua vedo tutti i servizi, ho i pod, insomma, qua vedi che c'è Redis,
Alessandro Peyrachia: Sparalo dietro.
Enrico Portolan: qua c'è un Quindi questo,
Alessandro Peyrachia: Ok,
Enrico Portolan: tra l'altro,
Alessandro Peyrachia: ottimo.
Enrico Portolan: è creato in maniera dinamica e quindi non dovete fare nulla lato vostro si aggiorna in base al
Alessandro Peyrachia: Sì, sì,
Enrico Portolan: traffico e alle trace che lui vede.
Alessandro Peyrachia: ok.
Enrico Portolan: Ok?
 
 
00:24:14
 
Enrico Portolan: Eh, magari questo sì, potrebbe essere in effetti in effetti utile su quello che mi dicevi
Alessandro Peyrachia: Mh, sì, questo sì, non c'è tantissimo da traffico adesso in realtà da vedere,
Enrico Portolan: perché
Alessandro Peyrachia: nel senso ci sono veramente tre servizi,
Enrico Portolan: mh mh
Alessandro Peyrachia: quindi è abbastanza semplice la la visualizzazione in questo caso,
Enrico Portolan: M.
Alessandro Peyrachia: però già avere la visualizzazione complessiva dell'applicazione, vedere se ci sono, per esempio, delle latenze esagerate andando verso il database o cosa del genere, ci dà una buona una buona visibilità, diciamo. Adesso è molto semplice, cioè fa anche ridere attivarlo su un'applicazione del genere,
Enrico Portolan: Sì,
Alessandro Peyrachia: però intanto bisogna vedere scovare subito le problematiche.
Enrico Portolan: mi diceva Davide che la parte, diciamo, quella più grossa è quella di dei job, giusto?
Alessandro Peyrachia: Eh sì, sì, quella è la parte più interessante, cioè il core business sta lì,
Enrico Portolan: dati.
Alessandro Peyrachia: eh il frontend, sì, è il modo per ovviamente per prendere i clienti e dargli le informazioni, però diciamo che la la parte mission critical è quella del dei job,
Enrico Portolan: Certo.
Alessandro Peyrachia: il resto è, diciamo, il business su quello
 
 
00:25:17
 
Enrico Portolan: Ok. Magari magari
Alessandro Peyrachia: su boh, vai pure. Nel senso,
Enrico Portolan: possiamo
Alessandro Peyrachia: la parte di per la parte di applicazione portale, secondo me, siamo a posto così, nel senso c'è proprio tutto quello che ci serve. C'è già anche molto molto oltre.
Enrico Portolan: m Sì,
Alessandro Peyrachia: Andiamo.
Enrico Portolan: sì, sì. No, infatti per quello anche stavo pensando, no, ovviamente probabilmente l'hai anche già visto su le varie funzionalità della PM. tu per ogni richiesta che arriva all'applicativo, se vuoi puoi andare a vedere, faccio vedere magari una con un errore così è più chiaro, però qual è l'idea che puoi andare a vedere tutto quello che è successo all'interno di qualsiasi chiamata, quale IPI ha chiamato, quale DB, ti faccio vedere magari su una mappa un po' più concettuale di nuovo. Quindi qua posso vedere dove la latenza, quanto ogni servizio eh ha impattato sulla sul tempo di esecuzione e ovviamente se devo andare a debuggare in questo caso vedo che l'errore su eh un API terza
Alessandro Peyrachia: C.
Enrico Portolan: di eh di payment,
Alessandro Peyrachia: Ok.
Enrico Portolan: quindi questo magari più per il team developer secondo me,
 
 
00:26:16
 
Alessandro Peyrachia: Sì,
Enrico Portolan: quindi per loro fai finta che c'hai il cliente che ti dice "Guarda,
Alessandro Peyrachia: sì.
Enrico Portolan: non riesco a vedere quel grafico, tu me lo immagino super fatto". facile. Vai qua, sai che l'apfico è, non lo so, create graph,
Alessandro Peyrachia: Sì, sì,
Enrico Portolan: vedi quali hanno il 500 error e vai a vedere il tempo di esecuzione,
Alessandro Peyrachia: cerco tutto.
Enrico Portolan: cosa è esploso, cosa no. Eh, se vuoi hai anche i log relativi a ogni singola trace direttamente qua e diciamo l'idea è aiutarvi a semplificare il il debugging. Ehm e questo poi secondo me quando lo provate nel trial si vedrà
Alessandro Peyrachia: Chiaro?
Enrico Portolan: ancora meglio. A riapprofitto. Io sono stavo discondendo della da parte di di Jobs per farti vedere quel modulo dedicato. Quindi, eh, tra l'altro hanno lanciato proprio adesso,
Alessandro Peyrachia: Sì.
Enrico Portolan: 10 giorni fa proprio un modulo dedicato alla osservabilità dei dei dati, tra cui c'è anche la parte di di jobs monitoring e eh come funziona.
Alessandro Peyrachia: Ok.
Enrico Portolan: Quindi qui tu hai sempre, tra l'altro, con lo stesso agent, quindi non devi fare cose, diciamo, extra.
 
 
00:27:23
 
Enrico Portolan: Hai visibilità su i data jobs, come vedi, hai data bricks, spark, airflow, questo non so cosa sia, però quelli che usate voi,
Alessandro Peyrachia: Eh, DBT. Sì,
Enrico Portolan: ok? Eh,
Alessandro Peyrachia: sì.
Enrico Portolan: sono coperti e ehm posso vedere sia appunto eh i bat jobs, streaming e e i cluster. Quindi, qual è l'idea qui? e andare a vedere magari filtro per airflow, quindi io posso andare a vedere ogni per ogni singolo job ovviamente le metriche eh a
Alessandro Peyrachia: Sì,
Enrico Portolan: livello macro, no? Quindi quanti jobs run,
Alessandro Peyrachia: sì,
Enrico Portolan: la quanto ci ha messo l'ultima esecuzione,
Alessandro Peyrachia: curato.
Enrico Portolan: l'average, quindi magari io qua voglio vedere, ad esempio, qua vedo che un average è salita di tantissimo, no? Quindi già qua posso fare dei dei ragionamenti o posso filtrare per quelli che hanno dei
Alessandro Peyrachia: Sì.
Enrico Portolan: fail run.
Alessandro Peyrachia: Ok.
Enrico Portolan: Ehm, qua magari anche dimmi tu, perché ovviamente usandolo ogni giorno mh sai
Alessandro Peyrachia: Eh sì, quello che quello che puoi provare ad aprire un job,
Enrico Portolan: dirmi
Alessandro Peyrachia: perché generalmente il job airflow è composto da una serie di step,
 
 
00:28:25
 
Enrico Portolan: Sì,
Alessandro Peyrachia: quindi Ah, ecco,
Enrico Portolan: esatto.
Alessandro Peyrachia: se guardi nei task secondo me vediamo se ha quelle sono le jobrun e i
Enrico Portolan: Sì, forse sul
Alessandro Peyrachia: Ecco, perfetto. Sì, questi sono due task, quindi Ah, ok, interessante. Sì,
Enrico Portolan: Esatto.
Alessandro Peyrachia: si vede all'interno della dell'esecuzione come Ah,
Enrico Portolan: tieni conto che vedi Esatto,
Alessandro Peyrachia: ok, è bello.
Enrico Portolan: vedi ogni singola task,
Alessandro Peyrachia: Sì, Flameft dentro.
Enrico Portolan: quindi cioè con gli errori,
Alessandro Peyrachia: anche già ottimo. Sì,
Enrico Portolan: cioè l'idea è proprio a ha due eh obiettivi principali,
Alessandro Peyrachia: sì.
Enrico Portolan: uno aiutare voi in questo caso a vedere perché è fallito e qual è il task che ci mette più tempo.
Alessandro Peyrachia: C'è
Enrico Portolan: E questo lo puoi fare con questo grafico e e anche ovviamente con tutte le metriche che tu hai qui e tieni conto ovviamente che poi è legato a dici "Ok, questa è è il pod quello che ho depato prima, quindi in quel caso lo riesco a vedere da lì". Ehm quindi appunto durata failure rate per ogni singola per ogni singola
 
 
00:29:26
 
Enrico Portolan: run. Ad esempio, potremo vedere una che c'ha un errore eh su questa. Esatto. Eh, diciamo la cosa comoda che anche qui lo vedi, no? La anche per l'adoption la i concetti sono uguali a quello della PM, quindi lo stesso grafico, lo stesso in questo caso è fallito. Eh, ti dice questo è l'errore che che ho visto su sull'airflow. L'altra e ovviamente anche qua per crearti del dei monitoraggi, no? Quindi se vedi Esatto.
Alessandro Peyrachia: E sì,
Enrico Portolan: Tipo qua ti
Alessandro Peyrachia: se fallisce qualcosa o passa un certo tipo,
Enrico Portolan: dice
Alessandro Peyrachia: una certa durata di esecuzione, per esempio. Esatto. C'è c'è già lì pronto.
Enrico Portolan: mh,
Alessandro Peyrachia: Slongect. Perfetto.
Enrico Portolan: esatto, ce l'hai già configurati. L'altro tema in cui stanno investendo è appunto andare ad
Alessandro Peyrachia: Occhio.
Enrico Portolan: ottimizzare il costo di questi job. Quindi eh se io vado sulla parte dei cluster, lui ti fa vedere. Adesso qua ho degli esempi solo su su databaks che in realtà magari potete già usare visto che vi costa.
 
 
00:30:26
 
Enrico Portolan: Ti fa vedere ad esempio in base a lui vede quanto dura il job si può
Alessandro Peyrachia: Sì.
Enrico Portolan: ottimizzare. Ad esempio qua ti suggerisce di fare un downsiz e ti manda anche già la redirect
Alessandro Peyrachia: Ah, di cambiare l'istanza. Ok. Sì.
Enrico Portolan: su data bricks poi per per farlo. Ok? Quindi è comodo perché hai tutto eh dentro la stessa piattaforma e riesci anche a a vedere a controllare eh diciamo i costi sui sui job e
Alessandro Peyrachia: Questo questo è interessante. Sì,
Enrico Portolan: poi qui m eh
Alessandro Peyrachia: sì, sì,
Enrico Portolan: questo poi
Alessandro Peyrachia: questo.
Davide Di Donato: Se ti posso chiedere Alessandro come come fate a controllare adesso a livello di costi per quanto riguarda so che
Enrico Portolan: M.
Davide Di Donato: Databx comunque vi costava parecchio e state migrando anche per quello, ma come controllavate fino
Alessandro Peyrachia: Abbiamo scritto il codice Python che fa la riconciliazione tra il come si chiama
Davide Di Donato: adesso?
Alessandro Peyrachia: il buildingure e i job che eseguiamo. Quindi roba custom abbastanza abbastanza
Davide Di Donato: Ok,
Alessandro Peyrachia: interessante, eh.
Davide Di Donato: ha funzionato però.
Alessandro Peyrachia: Sì, sì, funziona, funziona.
 
 
00:31:29
 
Alessandro Peyrachia: È chiaro che cioè è una roba totalmente customizzata, quindi se devi aggiungere qualcosa manutenzione,
Davide Di Donato: manutenzione.
Alessandro Peyrachia: quindi lì bisogna vedere. è sempre il solito concetto,
Davide Di Donato: Ok.
Alessandro Peyrachia: lo compro fatto perché ci posso stare, non ci posso stare dietro oppure ho il tempo per starci dietro e e boh, e lo faccio. E è chiaro che da un prodotto già prefatto, cioè una mi aspetto che faccia le stesse cose e altre nell'altro senso se me lo devo fare da da solo posso ci metto il tempo che ci metto.
Davide Di Donato: Certo.
Alessandro Peyrachia: potrebbe essere anche che ci metto un tempo che non è sensato per il lavoro che fa,
Enrico Portolan: M.
Alessandro Peyrachia: perché comunque alla fine più o meno anche solo spannometricamente, come dicevamo un po' di tempo fa, eh sappiamo cosa dove spendiamo. È chiaro che andare a vedere effettivamente cosa stiamo spendendo ha molto più senso, è molto più importante e molto più anche interessante capirlo, anche perché abbiamo, per esempio,
Davide Di Donato: M.
Alessandro Peyrachia: adesso non non avevamo niente per farlo,
Enrico Portolan: M.
Alessandro Peyrachia: adesso è l'abbia fatto nelle ultime due settimane questo job di riconciliazione e abbiamo già visto un paio di cose interessanti.
 
 
00:32:36
 
Davide Di Donato: Ok.
Enrico Portolan: Sì.
Alessandro Peyrachia: È molto complicato farlo, però bisogna scaricarsi il report,
Davide Di Donato: Sì,
Alessandro Peyrachia: lavorarlo in anticipo,
Davide Di Donato: certo.
Alessandro Peyrachia: pre, cioè c'è del lavoro da fare.
Davide Di Donato: anche in ottica di stabil di scalabilità, scusami, non era non
Alessandro Peyrachia: Sì. No, no, se devi aggiungere una categoria, devi andare nel codice, aggiungere una categoria, devi aggiungere un qualcosina di un certo tipo di aggregazione,
Davide Di Donato: è.
Enrico Portolan: M.
Alessandro Peyrachia: ti devi scrivere del codice Python e testarlo, provarlo, quindi insomma no, eh, se hai solo quello da fare nella vita, magari va bene, ma magari no. Quindi bisogna vedere anche chi lo fa il quel lavoro lì, perché in questo momento quel lavoro lì costa veramente tanto, perché lo sta facendo una persona che costa veramente tanto a livello non solo di di di soldi, ma di di tempo.
Davide Di Donato: di tempo.
Alessandro Peyrachia: Il suo tempo è prezioso e non dovrebbe fare queste cose qui,
Davide Di Donato: Esatto.
Alessandro Peyrachia: quindi ci sta. Va bene, va bene. Questo, questo è molto interessante e perché obiettivamente è difficile farlo. Quindi questo lavoro qui,
 
 
00:33:34
 
Enrico Portolan: อ
Alessandro Peyrachia: trovarlo preconfigurato è effettivamente supporto sia airflow che
Davide Di Donato: Eh, non ne avevamo parlato nel nel meeting scorso semplicemente perché non c'era,
Alessandro Peyrachia: datab
Davide Di Donato: almeno non era era in preview e non era in in general availability, quindi questo ti fa capire anche,
Alessandro Peyrachia: mene
Davide Di Donato: diciamo, il tasso, insomma, di miglioramento della piattaforma.
Alessandro Peyrachia: bene. Questo sì, questo è interessante, devo essere sincero.
Davide Di Donato: Scusami se ti ho interrotto.
Alessandro Peyrachia: Vai,
Enrico Portolan: No, no, no,
Alessandro Peyrachia: vai.
Enrico Portolan: tanto e è per voi. No, comunque esatto, soprattutto questa parte di eh delability stanno stanno investendo un sacco, stanno cambiando un sacco un sacco di cose. Ehm Ok. Eh, quindi abbiamo visto Vai,
Alessandro Peyrachia: Posso chiedere solo mentre siamo qua la parte di cosa si può fare con la parte di AI
Enrico Portolan: vai.
Alessandro Peyrachia: observability,
Enrico Portolan: Sì,
Alessandro Peyrachia: perché noi un po' dopo eh finisci pure quel giro perché ovviamente noi alla fine
Enrico Portolan: sì.
Alessandro Peyrachia: facciamo intelligenza artificiale, non Geni, quindi siamo su uno scope completamente differente anche come dimensione, però Dopo, magari se abbiamo 5 minuti magari mi
 
 
00:34:48
 
Enrico Portolan: Sì, tanto Allora,
Alessandro Peyrachia: interesserebbe.
Enrico Portolan: diciamo che la parte di Cubernetis l'abbiamo vista, la parte di data Jobs l'abbiamo vista,
Alessandro Peyrachia: Sì,
Enrico Portolan: la PM logs velocemente,
Alessandro Peyrachia: sì,
Enrico Portolan: però mi sembra di capire che comunque eh ci siamo. Dimmi tu se se è
Alessandro Peyrachia: sì, sì, sì, sì, sì. Adesso ti dico,
Enrico Portolan: corretto.
Alessandro Peyrachia: ehm, è già chilometri avanti a quello che ci serve, quindi va benissimo
Enrico Portolan: Ok, magari se siete d'accordo potremmo fare una decina di minuti sulla parte di front-end anche per vedere cosa cosa
Alessandro Peyrachia: così.
Enrico Portolan: offre, come può aiutarvi eh soprattutto quegli scenari di qualcosa non funziona,
Alessandro Peyrachia: Sì,
Enrico Portolan: voglio vedere se i grafici funzionano, eccetera eccetera. E poi ci lasciamo, sì l'ultimo 10 minuti così sia per domande sia per vedere altri moduli che potrebbero essere,
Alessandro Peyrachia: sì. Ok,
Enrico Portolan: diciamo, interessanti.
Alessandro Peyrachia: va
Enrico Portolan: Ehm Ok. E poi,
Alessandro Peyrachia: bene.
 
 
00:35:40
 
Enrico Portolan: tra l'altro sulle R mod faccio vedere anche tu una parte poi di di monitoraggi. Allora, eh la parte di real monitoring,
Alessandro Peyrachia: Ok.
Enrico Portolan: quindi frontend, fa parte del modulo di digital experience che sostanzialmente comprende tutta una parte di
Alessandro Peyrachia: Sì.
Enrico Portolan: testing sintetico, quindi test di API, browser test proprio e immaginio un bot che va e e fa cose
Alessandro Peyrachia: Sì, cosa te? No, ci ho lavorato anche su questo con il vecchio
Enrico Portolan: dentro. Ok.
Alessandro Peyrachia: Cypress.
Enrico Portolan: Esatto, esatto. Identico, però è è un tool no code fatto da Datogg. Ehm,
Alessandro Peyrachia: Ok,
Enrico Portolan: e poi c'è la parte di real monitoring che sia copra la parte web che anche mobile. Se voglio vedere la parte web cos'è che ho?
Alessandro Peyrachia: ok.
Enrico Portolan: prima pagina di dashboard, tutta una parte di metriche eh i vitals per diciamo vedere se ci sono delle ottimizzazioni da fare sul loading time. Tieni conto che per ognuno di essi poi io posso andare a vedere qual è la risorsa che ci mette più tempo perché magari c'ho un'immagine di 3 mega all'inizio che ci mette un sacco a caricare.
 
 
00:36:47
 
Alessandro Peyrachia: Sì,
Enrico Portolan: Tutta questa parte di analisi lo posso fare esatto.
Alessandro Peyrachia: questa cosa qua è vita vissuta l'immagine da 3 mega cè
Enrico Portolan: No, no, esatto, perché anch'io ero ero davvero per quindi per quello te lo dico.
Alessandro Peyrachia: Mamma
Enrico Portolan: Ok, quindi poi qua vedi per ognuno di essi tu puoi andare,
Alessandro Peyrachia: mia!
Enrico Portolan: clicchi ti fa vedere eh cosa è successo, anzi cosa cosa ha visto e come possiamo andare a ridurre il tempo di di
Alessandro Peyrachia: Ok,
Enrico Portolan: caricamento o di o di rendering, magari, eh. L'altra cosa è ror frontend,
Alessandro Peyrachia: interessante.
Enrico Portolan: no? Quindi, eh,
Alessandro Peyrachia: E
Enrico Portolan: mi diceva Davide che adesso è coperto forse da Centry, se non sbaglio,
Alessandro Peyrachia: sì, abbiamo Sì,
Enrico Portolan: però
Alessandro Peyrachia: nel nel giro c'è anche Sentry e Centry fa un po', diciamo, il jolly, no? quando ogni tanto tira su delle cose che non vede nessun altro e
Enrico Portolan: Esatto,
Alessandro Peyrachia: giustamente e quindi siamo
Enrico Portolan: esatto. Qui l'idea Esatto.
Alessandro Peyrachia: ancora
Enrico Portolan: L'idea è avere quegli stessi errori che che vedete adesso in un tool, però avere tutto unito, quindi il team usa tutto sempre lo stesso tool.
 
 
00:37:48
 
Alessandro Peyrachia: sei tu.
Enrico Portolan: qui ha i tuoi errori, la tua frontend. Qual è il vantaggio? Che ovviamente non solo vedi l'errore stesso, ti dice come puoi fixarlo, ma se vuoi puoi andare a vedere anche ovviamente quale impatto ho avuto su quale sessione e quale magari API, quindi quale backend è andato a a colpire, no? Quindi io posso andare a targetizzare la singola sessione se voglio e e anche poi i log
Alessandro Peyrachia: Sì.
Enrico Portolan: relativi a quella sessione.
Alessandro Peyrachia: Ok.
Enrico Portolan: Ehm qui di nuovo sono tutti, diciamo, tra parti di ottimizzazione, il tracking delle dalle varie versioni del sito web, ma magari andrei a vedere la parte di Explorer delle sessioni, quindi capire veramente cosa sta facendo l'utente nella vostra piattaforma. Adesso qui lo filtro per sessioni fatte da utenti veri,
Alessandro Peyrachia: Sì,
Enrico Portolan: perché c'è l'altra sezione che sono sessioni fatte da quel eh browser test che ti spiegavo prima.
Alessandro Peyrachia: sì, sì,
Enrico Portolan: E io da qui posso andare a vedere, ad esempio,
Alessandro Peyrachia: sì.
Enrico Portolan: eh, vediamo tipo questo qui. Mh, ovviamente posso andare a vedere qualsiasi sessione che l'utente ha fatto,
 
 
00:39:00
 
Alessandro Peyrachia: Sì.
Enrico Portolan: qualsiasi vista in cui ha cliccato, se ho dei segnali di frustrazione che possono essere i classici link rotti o il bottone che ci mette 3 secondi a caricare,
Alessandro Peyrachia: Ja.
Enrico Portolan: errori. Quindi per ognuno di essi io posso cliccare dentro, vedere quello che è successo, vedere se ci sono errori, ma se voglio, se ad un click è legata un API call, posso andare a vedere anche quello. Quindi quello che posso fare è dire, vedi, lui fa una fetch di un API di recommendation o di prodotti. Questo è un API che mi eh restituisce un Jason di prodotti.
Alessandro Peyrachia: Sì.
Enrico Portolan: Io qua clicco e cosho? Ho la vista della PM, quindi fai finta che questo sia il grafico che dicevi prima.
Alessandro Peyrachia: Ok. Sì, sì.
Enrico Portolan: Qua tu vedi che l'utente Pink Pallino ha cliccato e ha visto che il Jason del grafico è sbagliato e da qui io so uno che è il backend dove è fallito il log del backend, ma di nuovo anche chi è l'utente perché ho la sessione, ho gli attributi, se voglio posso mettere l'email dell'utente quando si logga e anche da dove da dove arrivo. Ok.
 
 
00:40:15
 
Alessandro Peyrachia: Questo sì, questo gira tutto inserendo l'est immagino
Enrico Portolan: Sì, esatto.
Alessandro Peyrachia: sì, solo tirando dentro l' stk di datalog nell'applicazione,
Enrico Portolan: Sì,
Alessandro Peyrachia: poi fa tutto lui.
Enrico Portolan: esatto.
Alessandro Peyrachia: Ok,
Enrico Portolan: Stkato frontend e fa tutto lui.
Davide Di Donato: M.
Alessandro Peyrachia: questo ok.
Enrico Portolan: Tra l'altro poi puoi aggiungere la parte di session replay, quindi va a registrare quello che l'utente ha fatto, quindi clicca da una parte, eh clicca da un'altra, fa cose e per ogni step posso andare a vedere le variazioni che che ha
Alessandro Peyrachia: Ah, questo è
Enrico Portolan: fatto. Ok?
Alessandro Peyrachia: interessante.
Enrico Portolan: Quindi ehm questo potrebbe essere utile per quello appunto che ci descrivevi prima.
Alessandro Peyrachia: Sì,
Davide Di Donato: per le Time
Alessandro Peyrachia: and a vedere Esatto.
Davide Di Donato: Series.
Alessandro Peyrachia: andare a vedere l'utente cosa clicca, come usa il portale, anche solo eh proprio a livello di interazione utente che tipo adesso noi abbiamo una user experience che non è bellissima, quindi anche solo avere,
Davide Di Donato: Avete
Alessandro Peyrachia: cioè sì, è utilizzabile, ma non è proprio il portale più bello del mondo.
 
 
00:41:13
 
Alessandro Peyrachia: E quindi Sì,
Davide Di Donato: delle figure di di UX designer o nel futuro che che si regerete
Alessandro Peyrachia: sì, sì, sì, sì, sì, sì.
Davide Di Donato: o
Alessandro Peyrachia: Solo che prima bisogna mettere eh, come si dice, le funzionalità, eh, poi poi è spostare i pannelli in giro per l'interfaccia.
Davide Di Donato: ti volevo chiedere Sì,
Alessandro Peyrachia: Eh, c'è c'è tempo. Tanto ti dico,
Davide Di Donato: volevo chiedere al volo.
Alessandro Peyrachia: il nostro utente è un utente non è un utente, cioè il nostro non è un portale pubblico dove l'impatto è importante.
Enrico Portolan: M.
Alessandro Peyrachia: Il nostro è per un utente specifico di business di una certa azienda,
Davide Di Donato: Certo, certo.
Alessandro Peyrachia: quindi cioè alla fine della fiera è abituato magari a utilizzare prodotti ancora più vecchi o nessun prodotto, quindi la parte di proprio di bellezza del portale passa un po' indietro rispetto ai i
Davide Di Donato: Certo,
Alessandro Peyrachia: dati crudi che gli devono arrivare che sono la quello che poi fa la differenza per
Davide Di Donato: certo,
`;
