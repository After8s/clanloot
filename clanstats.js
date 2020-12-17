var bungieAPIkey = "0a11942f318647978979f13ad8aa53ee",
  clan = {},
  header = "Clan Loot",
  version = "v2.12",
  retriesPerCharacter = 2,
  consoleTypes = [1, 2, 3, 4, 5, 10],
  consoleTypesNames = {
    1: "XBOX",
    2: "PSN",
    3: "PC",
    4: "BNET",
    5: "Stadia",
    10: "demon"
  },
  loadingCircle = ["&#x25D1;", "&#x25D2;", "&#x25D0;", "&#x25D3;"],
  loadingCircleIndex = 0;

function lookupClan(e, o) {
  void 0 === o && (o = !1), $("#lookupError").hide();
  
  //old version for get endpoint
  //var t = "https://www.bungie.net/Platform/GroupV2/Name/" + e + "/1/";
  //o && (t = "https://www.bungie.net/Platform/GroupV2/" + e + "/"),
  
  var t = "https://www.bungie.net/Platform/GroupV2/NameV2/";
  
  var d = "{'groupName': '" + e + "', 'groupType':'1'}";
    $.ajax({
      url: t,
      headers: {
        "X-API-KEY": bungieAPIkey
      },
	  data: d, 
      method: "POST",
      success: function(e) {
        void 0 !== e.Response.detail.groupId
          ? getClanData(
              e.Response.detail.groupId,
              e.Response.detail.name +
                " [" +
                e.Response.detail.clanInfo.clanCallsign +
                "]"
            )
          : $("#lookupError").show();
      },
      error: function(e) {
        $("#lookupError").show(), $(".table > tbody").hide();
      }
    });
}

function getClanData(e, o) {
  (clan.clanId = e),
    (clan.clanName = o),
    (clan.memberIds = []),
    (clan.memberCount = 0),
    (clan.membersFetched = 0),
    (clan.memberName = {}),
    (clan.explicitConsoleType = {}),
    (clan.consoleTypeInOrder = {}),
    (clan.retryCounter = {}),
    (clan.unresolvedMemberNames = []),
    (clan.membersWith = {}),
    (clan.memberPlatforms = new Set()),
    (clan.SystemNotices = new Set()),
    (clan.membersWith.AffinitysGift = {
      hash: 845125280,
      apilocation: "characterCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.AfterTheNightfall = {
      hash: 319846607,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.AThousandWings = {
      hash: 3142437750,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Adored = {
      hash: 843352923,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.AlpineDash = {
      hash: 2957990665,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.AlwaysOnTime = {
      hash: 1903459810,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Anarchy = {
      hash: 2220014607,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Antediluvian = {
      hash: 1469913806,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Armory = {
      hash: 3531075476,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.BadJuju = {
      hash: 4207100358,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Bastion = {
      hash: 3207791447,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.BrayTechOsprey = {
      hash: 1534387877,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.BrayTechWerewolf = {
      hash: 1715819504,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Breakneck = {
      hash: 1666039008,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Buzzard = {
      hash: 2011258732,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.CleansingKnife = {
      hash: 1469913804,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Cloudstrike = {
      hash: 396432035,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Deathbringer = {
      hash: 888224289,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.DeathsRazor = {
      hash: 1572606157,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Delirium = {
      hash: 1639266456,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.DevilsRuin = {
      hash: 2190071629,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.DFA = {
      hash: 1279318110,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Divinity = {
      hash: 1988948484,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.DriftApart = {
      hash: 3163873691,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.DutyBound = {
      hash: 1333654061,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Edgewise = {
      hash: 853534062,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.EmperorsChosen = {
      hash: 2678796997,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Ermine = {
      hash: 3163873693,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.ExitStrategy = {
      hash: 1510655351,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.FlawlessEmpyrean = {
      hash: 864251146,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.FurtiveShell = {
      hash: 3360537486,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Goldtusk = {
      hash: 3376099856,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Hawkmoon = {
      hash: 653763964,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.HeavyAsDeath = {
      hash: 2242184255,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.HeirApparent = {
      hash: 2842076592,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.HubrisOfNiobe = {
      hash: 3689404793,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.HorrorsLeast = {
      hash: 1099984904,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Hush = {
      hash: 1670904512,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.ImpactVelocity = {
      hash: 3036030067,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.IzanagisBurden = {
      hash: 24541428,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Komodo = {
      hash: 4116184726,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.LeviathansBreath = {
      hash: 3552855013,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.LoadedQuestion = {
      hash: 3810740723,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Ludomaniacal = {
      hash: 1387277885,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.LunasHowl = {
      hash: 3260604718,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Lumina = {
      hash: 2924632392,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Malfeasance = {
      hash: 1660030045,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.MilitiasBirthright = {
      hash: 1602518767,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.MindbendersAmbition = {
      hash: 1074861258,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Mountaintop = {
      hash: 4047371119,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),/*
    (clan.membersWith.NecroticGrip = {
      hash: 1128765419,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    (clan.membersWith.NoLoveLost = {
      hash: 3574313939,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.NotForgotten = {
      hash: 3260604717,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.OfTenSuns = {
      hash: 1669843839,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.OneThousandVoices = {
      hash: 199171385,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.OutbreakPerfected = {
      hash: 2500286745,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Oxygen = {
      hash: 543982652,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.PallasGalliot = {
      hash: 3163873689,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.PersistentBlaze = {
      hash: 1822110017,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.PointoftheStag = {
      hash: 1135136071,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Python = {
      hash: 3972149937,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.QuarantineZone = {
      hash: 3967648329,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.RandysThrowingKnife = {
      hash: 1303705556,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Recluse = {
      hash: 2335550020,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.RedrixsBroadsword = {
      hash: 1111219481,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.RedrixsClaymore = {
      hash: 4274523516,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Revoker = {
      hash: 3066162258,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.RuinousEffigy = {
      hash: 1392294260,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.SaviorofthePast = {
      hash: 2195312831,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Scrap = {
      hash: 1840126886,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.ShadowofEarth = {
      hash: 753635605,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.SiliconNeuroma = {
      hash: 1152758802,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.SilverTercel = {
      hash: 1469913807,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.SimulantSpring = {
      hash: 33346659,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.StarlightShell = {
      hash: 3360537487,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.SugaryShell = {
      hash: 1561962824,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Tarrabah = {
      hash: 2329697053,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TheFourthHorseman = {
      hash: 2318862156,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TheLament = {
      hash: 3935854305,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TheLastWord = {
      hash: 3074058273,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TheLongGoodbye = {
      hash: 1186314105,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TheTributeHall = {
      hash: 1242690193,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TheVow = {
      hash: 2772970661,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Thorn = {
      hash: 4009683574,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.ThroneCleaver = {
      hash: 1692129580,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TiltFuse = {
      hash: 3036030066,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TravelersChosen = {
      hash: 1370087379,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Trichromatica = {
      hash: 1718922261,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.TrueGlory = {
      hash: 2237933811,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Truth = {
      hash: 1763840761,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.UniversalWavefunction = {
      hash: 2448009818,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Voidstreak = {
      hash: 1966171335,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.WardensLaw = {
      hash: 1279318101,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Warminded = {
      hash: 2691646946,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Wendigo = {
      hash: 3830703103,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Whisper = {
      hash: 3875807583,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.WishEnder = {
      hash: 1660030044,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.WishMaker = {
      hash: 3360537485,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.WormGod = {
      hash: 2466440635,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.Xenophage = {
      hash: 1258579677,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.YouAreWorthy = {
      hash: 2237933812,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.EyesofTomorrow = {
      hash: 753200559,
      apilocation: "profileCollectibles",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealBeyondLight = {
      hash: 2482004751,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealCursebreaker = {
      hash: 3214425110,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealDeepStoneCrypt = {
      hash: 540377256,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealDredgen = {
      hash: 1556658903,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealEnlightened = {
      hash: 2909250963,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealFlawless = {
      hash: 2126548397,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealHarbinger = {
      hash: 2584970263,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealRivensbane = {
      hash: 1384029371,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealUnbroken = {
      hash: 1343839969,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    (clan.membersWith.sealWarden = {
      hash: 1561715947,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),
    /*(clan.membersWith.sealShadow = {
      hash: 1883929036,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealBlacksmith = {
      hash: 2053985130,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
        /*(clan.membersWith.sealAlmighty = {
      hash: 2860165064,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealWayfarer = {
      hash: 2757681677,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealChronicler = {
      hash: 1754983323,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealConqueror = {
      hash: 1983630873,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealReckoner = {
      hash: 1313291220,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealUndying = {
      hash: 2707428411,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealMMXIX = {
      hash: 2254764897,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealMMXX = {
      hash: 4239091332,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealDawn = {
      hash: 2460356851,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    /*(clan.membersWith.sealArrivals = {
      hash: 2972478098,
      apilocation: "profileRecords",
      got: [],
      need: [],
      amountgot: 0,
      amountneed: 0
    }),*/
    $("#headerText").html(header + ": " + clan.clanName),
    $("#membercounter")
      .html("")
      .show(),
    $.ajax({
      url:
        "https://www.bungie.net/Platform/GroupV2/" + clan.clanId + "/Members/",
      headers: {
        "X-API-KEY": bungieAPIkey
      },
      method: "GET"
    }).done(function(e) {
      e.Response
        ? ($.each(e.Response.results, function(e, o) {
            clan.memberPlatforms.add(
              consoleTypesNames[o.destinyUserInfo.membershipType]
            );
          }),
          $("#headerText").append(
            '<span style="font-size: 0.5em"> on ' +
              Array.from(clan.memberPlatforms).join(", ") +
              "</span>"
          ),
          $.each(e.Response.results, function(e, o) {
            clan.memberIds.push(o.destinyUserInfo.membershipId),
              (clan.retryCounter[o.destinyUserInfo.membershipId] = 0),
              (clan.explicitConsoleType[o.destinyUserInfo.membershipId] =
                o.destinyUserInfo.membershipType),
              (clan.consoleTypeInOrder[o.destinyUserInfo.membershipId] = 0),
              (clan.memberName[o.destinyUserInfo.membershipId] =
                o.destinyUserInfo.displayName),
              1 < clan.memberPlatforms.size &&
                (clan.memberName[o.destinyUserInfo.membershipId] +=
                  " (" +
                  consoleTypesNames[o.destinyUserInfo.membershipType] +
                  ")");
          }),
          (clan.memberCount = clan.memberIds.length),
          $.each(clan.memberIds, function(e, o) {
            checkForSpecialAchievements(o);
          }))
        : $("#claninfo").html("API down?");
    });
}

function checkForSpecialAchievements(e) {
  var o =
    0 < clan.explicitConsoleType[e]
      ? clan.explicitConsoleType[e]
      : consoleTypes[clan.consoleTypeInOrder[e]];
  $.ajax({
    url:
      "https://www.bungie.net/Platform/Destiny2/" +
      o +
      "/Profile/" +
      e +
      "/?components=800,900",
    headers: {
      "X-API-KEY": bungieAPIkey
    },
    method: "GET",
    error: function(o) {
      if (
        ((clan.explicitConsoleType[e] = 0),
        clan.consoleTypeInOrder[e] < consoleTypes.length)
      )
        clan.consoleTypeInOrder[e]++, checkForSpecialAchievements(e);
      else {
        if (
          ((clan.consoleTypeInOrder[e] = 0),
          clan.retryCounter[e]++,
          clan.retryCounter[e] >= retriesPerCharacter)
        )
          return void clan.unresolvedMemberNames.push(clan.memberName[e]);
        checkForSpecialAchievements(e);
      }
    }
  }).done(function(o) {
    if (
      1 < o.ErrorCode ||
      !o.Response ||
      void 0 === o.Response.profileCollectibles.data
    ) {
      if ((clan.retryCounter[e]++, clan.retryCounter[e] >= retriesPerCharacter))
        return void clan.unresolvedMemberNames.push(clan.memberName[e]);
      checkForSpecialAchievements(e);
    } else
      (clan.membersFetched = clan.membersFetched + 1),
        $.each(clan.membersWith, function(t, n) {
          "profileRecords" == n.apilocation &&
            (void 0 !== o.Response.profileRecords.data.records[n.hash] &&
            67 === o.Response.profileRecords.data.records[n.hash].state
              ? ((n.amountgot = n.amountgot + 1),
                n.got.push(clan.memberName[e]))
              : ((n.amountneed = n.amountneed + 1),
                n.need.push(clan.memberName[e]),
                void 0 === o.Response.profileRecords.data.records[n.hash] &&
                  clan.SystemNotices.add(
                    "please check hash and location for " +
                      t +
                      " (" +
                      n.hash +
                      " in " +
                      n.apilocation +
                      ")"
                  ))),
            "profileCollectibles" == n.apilocation &&
              (void 0 !==
                o.Response.profileCollectibles.data.collectibles[n.hash] &&
              o.Response.profileCollectibles.data.collectibles[n.hash].state %
                2 ==
                0
                ? ((n.amountgot = n.amountgot + 1),
                  n.got.push(clan.memberName[e]))
                : ((n.amountneed = n.amountneed + 1),
                  n.need.push(clan.memberName[e]),
                  void 0 ===
                    o.Response.profileCollectibles.data.collectibles[n.hash] &&
                    clan.SystemNotices.add(
                      "please check hash and location for " +
                        t +
                        " (" +
                        n.hash +
                        " in " +
                        n.apilocation +
                        ")"
                    ))),
            "characterCollectibles" == n.apilocation &&
              ((tmpItemWasNotFound = !0),
              $.each(o.Response.characterCollectibles.data, function(o, a) {
                if (
                  void 0 !== a.collectibles[n.hash] &&
                  a.collectibles[n.hash].state % 2 == 0
                )
                  return (
                    (n.amountgot = n.amountgot + 1),
                    n.got.push(clan.memberName[e]),
                    (tmpItemWasNotFound = !1)
                  );
                void 0 === a.collectibles[n.hash] &&
                  clan.SystemNotices.add(
                    "please check hash and location for " +
                      t +
                      " (" +
                      n.hash +
                      " in " +
                      n.apilocation +
                      ")"
                  );
              }),
              tmpItemWasNotFound &&
                ((n.amountneed = n.amountneed + 1),
                n.need.push(clan.memberName[e]))),
            (clan.membersWith[t] = n);
        }),
        outputClanData(clan);
  });
}

function getDescendantProp(e, o) {
  for (var t = o.split("."); t.length && (e = e[t.shift()]); );
  return e;
}

function outputClanData(e) {
  $(".table > tbody").show(),
    $.each(e.membersWith, function(o, t) {
      if (t.amountgot == e.memberCount)
        $("#" + o)
          .html(t.amountgot)
          .attr(
            "data-content",
            "Nobody! <br> Everyone in the clan has gotten this!"
          ),
          $("#" + o).css("background-color", "goldenrod");
      else {
        if (1 < clan.memberPlatforms.size) {
          var n = "",
            a = {};
          $.each(consoleTypesNames, function(e, o) {
            $.each(t.need, function(e, t) {
              t.endsWith(" (" + o + ")") &&
                (void 0 === a[o] && (a[o] = []),
                a[o].push(t.slice(0, t.length - o.length - 3)));
            });
          }),
            $.each(a, function(e, o) {
              n +=
                ' <span class="platform-item">' +
                e +
                "</span><br> " +
                o
                  .sort(function(e, o) {
                    return e.toLowerCase().localeCompare(o.toLowerCase());
                  })
                  .join(", ") +
                '<hr class="style-two">';
            }),
            (n = n.slice(0, n.length - 4)),
            $("#" + o)
              .html(t.amountgot)
              .attr("data-content", n);
        } else
          $("#" + o)
            .html(t.amountgot)
            .attr(
              "data-content",
              t.need
                .sort(function(e, o) {
                  return e.toLowerCase().localeCompare(o.toLowerCase());
                })
                .join(", ")
            );
        $("#" + o).css("background-color", "");
      }
    }),
    $("#membercounter").html(
      loadingCircle[loadingCircleIndex++ % loadingCircle.length] +
        " " +
        e.membersFetched +
        "/" +
        e.memberCount
    );
}

function searchButtonPressed() {
  reloadPage("clanname", $("input#ClanLookupInput").val());
}

function keypressInSearchbox(e) {
  13 === e.keyCode && reloadPage("clanname", $("input#ClanLookupInput").val());
}

function reloadPage(e, o) {
  location.href =
    window.location.protocol +
    "//" +
    window.location.hostname +
    window.location.pathname +
    "?" +
    e +
    "=" +
    o;
}

$(document).ready(function() {
  $(".table > tbody").hide();
  var e = new URLSearchParams(window.location.search);
  e.has("clanid")
    ? lookupClan(e.get("clanid"), !0)
    : e.has("clanname") && lookupClan(e.get("clanname"), !1);
}),
  $(document).ready(function() {
    $(function() {
      $("[data-toggle=popover]:not([data-popover-content])").popover(),
        $("[data-toggle=popover][data-popover-content]").popover({
          html: !0,
          content: function() {
            var e = $(this).attr("data-popover-content");
            return $(e)
              .children(".popover-body")
              .html();
          },
          title: function() {
            var e = $(this).attr("data-popover-content");
            return $(e)
              .children(".popover-heading")
              .html();
          }
        });
    }),
      $(".btn-filter").on("click", function() {
        var e = $(this).data("target");
        "all" != e
          ? ($(".table tr:not(.alwaysthere)").css("display", "none"),
            $('.table tr[data-status="' + e + '"]').fadeIn("slow"))
          : $(".table tr")
              .css("display", "none")
              .fadeIn("slow");
      });
  }),
  $(document).ajaxStop(function() {
    void 0 !== clan.unresolvedMemberNames &&
      (0 < clan.unresolvedMemberNames.length
        ? $("#membercounter")
            .html(clan.membersFetched + "/" + clan.memberCount + "!")
            .prop(
              "title",
              "unable to fetch data from " +
                clan.unresolvedMemberNames.join(", ")
            )
        : $("#membercounter").hide()),
      void 0 !== clan.SystemNotices &&
        0 < clan.SystemNotices.size &&
        console.log(clan.SystemNotices);
  });
