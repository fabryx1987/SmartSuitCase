
  //var data = '[{"oggetto_id":16,"oggetto_nome":"jeans","peso":480,"volume":1600},{"oggetto_id":16,"oggetto_nome":"jeans","peso":580,"volume":2160},{"oggetto_id":16,"oggetto_nome":"jeans","peso":690,"volume":2600},{"oggetto_id":16,"oggetto_nome":"jeans","peso":802,"volume":3170},{"oggetto_id":16,"oggetto_nome":"jeans","peso":210,"volume":350},{"oggetto_id":16,"oggetto_nome":"jeans","peso":250,"volume":500},{"oggetto_id":16,"oggetto_nome":"jeans","peso":290,"volume":290},{"oggetto_id":16,"oggetto_nome":"jeans","peso":358,"volume":358},{"oggetto_id":11,"oggetto_nome":"felpa cotone","peso":430,"volume":2000},{"oggetto_id":11,"oggetto_nome":"felpa cotone","peso":514,"volume":3600},{"oggetto_id":11,"oggetto_nome":"felpa cotone","peso":600,"volume":4500},{"oggetto_id":11,"oggetto_nome":"felpa cotone","peso":700,"volume":5600},{"oggetto_id":13,"oggetto_nome":"giacca elegante cotone","peso":784,"volume":4400},{"oggetto_id":14,"oggetto_nome":"giacca elegante velluto","peso":612,"volume":3519},{"oggetto_id":20,"oggetto_nome":"maglioncino cotone","peso":250,"volume":1200},{"oggetto_id":20,"oggetto_nome":"maglioncino cotone","peso":260,"volume":1250},{"oggetto_id":20,"oggetto_nome":"maglioncino cotone","peso":270,"volume":1300},{"oggetto_id":20,"oggetto_nome":"maglioncino cotone","peso":280,"volume":1350},{"oggetto_id":20,"oggetto_nome":"maglioncino cotone","peso":290,"volume":1400},{"oggetto_id":19,"oggetto_nome":"maglietta maniche corte cotone","peso":115,"volume":800},{"oggetto_id":19,"oggetto_nome":"maglietta maniche corte cotone","peso":125,"volume":850},{"oggetto_id":19,"oggetto_nome":"maglietta maniche corte cotone","peso":135,"volume":900},{"oggetto_id":19,"oggetto_nome":"maglietta maniche corte cotone","peso":145,"volume":950},{"oggetto_id":11,"oggetto_nome":"felpa cotone","peso":350,"volume":1500},{"oggetto_id":21,"oggetto_nome":"pantaloni tuta cotone","peso":378,"volume":2400},{"oggetto_id":15,"oggetto_nome":"giacca tuta sintetica","peso":360,"volume":1710},{"oggetto_id":22,"oggetto_nome":"pantaloni tuta sintetici ","peso":310,"volume":2025},{"oggetto_id":12,"oggetto_nome":"giacca a vento leggera","peso":375,"volume":1200},{"oggetto_id":23,"oggetto_nome":"pantofole estive","peso":220,"volume":2100},{"oggetto_id":27,"oggetto_nome":"pigiama privaverile maniche lunghe","peso":341,"volume":2250},{"oggetto_id":7,"oggetto_nome":"camicia maniche corte cotone","peso":193,"volume":1440},{"oggetto_id":24,"oggetto_nome":"pantofole invernali","peso":180,"volume":1800},{"oggetto_id":10,"oggetto_nome":"cintura tessuto","peso":160,"volume":180},{"oggetto_id":9,"oggetto_nome":"canottiera maniche corte cotone","peso":132,"volume":540},{"oggetto_id":8,"oggetto_nome":"canottiera cotone","peso":90,"volume":450},{"oggetto_id":2,"oggetto_nome":"boxer sintetici","peso":53,"volume":231},{"oggetto_id":1,"oggetto_nome":"boxer cotone","peso":52,"volume":264},{"oggetto_id":3,"oggetto_nome":"calzini corti cotone","peso":35,"volume":108},{"oggetto_id":3,"oggetto_nome":"calzini corti cotone","peso":37,"volume":110},{"oggetto_id":4,"oggetto_nome":"calzini corti spugna","peso":61,"volume":360},{"oggetto_id":4,"oggetto_nome":"calzini corti spugna","peso":55,"volume":350},{"oggetto_id":19,"oggetto_nome":"maglietta maniche corte cotone","peso":100,"volume":740},{"oggetto_id":17,"oggetto_nome":"macchina fotografica compatta","peso":190,"volume":200},{"oggetto_id":18,"oggetto_nome":"macchina fotografica reflex","peso":575,"volume":1000},{"oggetto_id":30,"oggetto_nome":"videocamera compatta","peso":180,"volume":330}]'


  /**
  *   Services
  */
  /*Services.generateMethod([
      ['getObject', '//localhost/SmartSuitCaseServerProject/index.php/Object/getObject'],
  ]);
    */


  /**
  *   Calcolo pesi
  */
  /*Core.peso
      .setMax(925)
      .setMaxCompagnia(29250)
      .setErrore(5)
      .setCoefSic(1.02)
      .setCoefList([
        { from: 0, to: 100, coef: 0.96 },
        { from: 101, to: 200, coef: 0.97 },
        { from: 201, to: 400, coef: 0.98 },
        { from: 401, to: 10000, coef: 0.99 }
      ])
      .setData([
        { list: [580, 270, 270, 214, 125, 160, 90, 52, 52, 37, 37, 55, 580, 270, 270, 214, 125, 160, 90, 52, 52, 37, 37, 55, 580, 270, 270, 214, 125, 160, 90, 52, 52, 37, 37, 55], hasCoefList: false },
        { list: [580, 270, 270, 214, 125, 160, 90, 52, 52, 37, 37, 55], hasCoefList: true },
        { list: [580, 270, 270, 214, 125, 160, 90, 52, 52, 37, 37, 55] }
      ]);
    
      console.log("Risultato V/F: ", Core.peso.run());
      console.log("Risultato: ", Core.peso.get());
  */


  /**
  *   Calcolo Volumi
  */
  Core.volume.setCoefList([
    { from: 0, to: 500, coef: 0.965 },
    { from: 501, to: 1000, coef: 0.975 },
    { from: 1001, to: 2000, coef: 0.985 },
    { from: 2001, to: 10000, coef: 0.995 }        
  ]);
  Core.volume.setCoefSic(1.02);
  Core.volume.setMax(8450);
  //Core.volume.setErrore(5);
  Core.volume.setData(
    { list: [580,270,270,214,125,160,90,52,52,37,37,55], hasCoefList: false },
    { list: [580,270,270,214,125,160,90,52,52,37,37,55], hasCoefList: true  }
  );
  console.log("Risultato: ", Core.volume.run());
  console.log("Risultato: ", Core.volume.get());



  /*
      Calcolo Quantità
  */
  /*Core.priority
    .setData([
      { id: 0, name: "Mutande", coefQ: 1 },
      { id: 1, name: "Calzini", coefQ: 1 },
      { id: 2, name: "Maglietta Intima", coefQ: 0.50 },
      { id: 3, name: "Maglietta a maniche corte", coefQ: 0.50 },
      { id: 4, name: "Pantaloni", coefQ: 0.33 }
    ])
    .setDaysNumber(7)
    .run();*/
    