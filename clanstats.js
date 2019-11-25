var bungieAPIkey = "0a11942f318647978979f13ad8aa53ee";
var clan = {};
var header = 'Clan Loot';
var version = 'v2.7.1';
var retriesPerCharacter = 2;
var consoleTypes = [2, 1, 3, 4, 5, 10]; 
var consoleTypesNames = {"2" : "PSN","1" : "XBOX","3" : "PC","4" : "BNET","5" : "Stadia","10" : "demon"}
var loadingCircle = ['&#x25D1;', '&#x25D2;', '&#x25D0;', '&#x25D3;'];
var loadingCircleIndex = 0;

$(document).ready(function () {
    $('.table > tbody').hide();
    var searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('clanid')) {
        lookupClan(searchParams.get('clanid'), true);
    } else if (searchParams.has('clanname')) {
        lookupClan(searchParams.get('clanname'), false);
    }

});

function lookupClan(clanNameOrId, isId) {

    if (isId === undefined) {
        isId = false;
    }

    $('#lookupError').hide();

    var queryUrl = 'https://www.bungie.net/Platform/GroupV2/Name/' + clanNameOrId + '/1/';

    if (isId) {
        queryUrl = 'https://www.bungie.net/Platform/GroupV2/' + clanNameOrId + '/';
    }

    $.ajax({
        url: queryUrl,
        headers: {
            'X-API-KEY': bungieAPIkey
        },
        method: 'GET',
        success: function (data) {
            if (typeof data.Response.detail.groupId !== "undefined") {
                getClanData(data.Response.detail.groupId, data.Response.detail.name + ' [' + data.Response.detail.clanInfo.clanCallsign + ']');
            } else {
                $('#lookupError').show();
            }
        },
        error: function (data) {
            $('#lookupError').show();
            $('.table > tbody').hide();
        }
    });
}


function getClanData(clanId, clanName) {

    clan.clanId = clanId;
    clan.clanName = clanName;
    clan.memberIds = [];
    clan.memberCount = 0;
    clan.membersFetched = 0;
    clan.memberName = {};
    clan.explicitConsoleType = {};
    clan.consoleTypeInOrder = {};
    clan.retryCounter = {};
    clan.unresolvedMemberNames = [];
    clan.membersWith = {};
    clan.memberPlatforms = new Set();
    
    clan.SystemNotices = new Set();

    clan.membersWith.AfterTheNightfall      = {hash:2618436059,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.AThousandWings         = {hash:3142437750,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.AlwaysOnTime           = {hash:1903459810,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Anarchy                = {hash:2220014607,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Armory                 = {hash:3531075476,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.BadJuju                = {hash:4207100358,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Breakneck              = {hash:1666039008,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.DeathsRazor            = {hash:1572606157,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Delirium               = {hash:1639266456,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.EmperorsChosen         = {hash:2678796997,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Goldtusk               = {hash:3376099856,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.HeavyAsDeath           = {hash:2242184255,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.HubrisOfNiobe          = {hash:888672408, apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.HorrorsLeast           = {hash:1099984904,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Hush                   = {hash:1670904512,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.IzanagisBurden         = {hash:24541428,  apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.LoadedQuestion         = {hash:3810740723,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.LunasHowl              = {hash:3260604718,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Lumina                 = {hash:2924632392,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Malfeasance            = {hash:1660030045,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.MilitiasBirthright     = {hash:1602518767,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.MindbendersAmbition    = {hash:1074861258,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Mountaintop            = {hash:4047371119,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.NotForgotten           = {hash:3260604717,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.OneThousandVoices      = {hash:199171385, apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.OutbreakPerfected      = {hash:2500286745,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Oxygen                 = {hash:543982652, apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.PersistentBlaze        = {hash:1822110017,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.QuarantineZone         = {hash:3525340634,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Recluse                = {hash:2335550020,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.RedrixsBroadsword      = {hash:1111219481,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.RedrixsClaymore        = {hash:4274523516,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Revoker                = {hash:3066162258,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Scrap                  = {hash:1840126886,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.ShadowofEarth          = {hash:753635605, apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Tarrabah               = {hash:2329697053,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.TheLastWord            = {hash:3074058273,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.TheLongGoodbye         = {hash:1186314105,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.TheTributeHall         = {hash:193320248, apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Thorn                  = {hash:4009683574,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.ThroneCleaver          = {hash:1692129580,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.TrueGlory              = {hash:2237933811,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Truth                  = {hash:1763840761,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.WardensLaw             = {hash:1279318101,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Wendigo                = {hash:3830703103,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Whisper                = {hash:3875807583,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.WishEnder              = {hash:1660030044,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.WormGod                = {hash:2466440635,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Antediluvian           = {hash:1469913806,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.BrayTechOsprey         = {hash:1534387877,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.CleansingKnife         = {hash:1469913804,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.DFA                    = {hash:1279318110,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.DriftApart             = {hash:3163873691,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.DutyBound              = {hash:1333654061,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Ermine                 = {hash:3163873693,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.FurtiveShell           = {hash:3360537486,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.ImpactVelocity         = {hash:3036030067,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Ludomaniacal           = {hash:923458194, apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.PallasGalliot          = {hash:3163873689,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.SiliconNeuroma         = {hash:1152758802,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.SilverTercel           = {hash:1469913807,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.StarlightShell         = {hash:3360537487,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.TiltFuse               = {hash:3036030066,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Trichromatica          = {hash:1718922261,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.UniversalWavefunction  = {hash:2448009818,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Warminded              = {hash:1716561040,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.WishMaker              = {hash:3360537485,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.RandysThrowingKnife    = {hash:1303705556,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.LeviathansBreath       = {hash:3552855013,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Edgewise               = {hash:853534062,apilocation:'profileCollectibles',    got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.BrayTechWerewolf       = {hash:1715819504,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Divinity               = {hash:1988948484,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Deathbringer           = {hash:888224289,apilocation:'profileCollectibles',    got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Xenophage              = {hash:1258579677,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.ExitStrategy           = {hash:1510655351,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.SimulantSpring         = {hash:3702643914,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.SugaryShell            = {hash:1561962824,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.AffinitysGift          = {hash:845125280, apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Voidstreak             = {hash:1966171335,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.YouAreWorthy           = {hash:2237933812,apilocation:'profileCollectibles',   got:[],need:[],amountgot:0,amountneed:0};

    clan.membersWith.Cursebreaker           = {hash:1693645129,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Shadow		            = {hash:1883929036,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Blacksmith	            = {hash:2053985130,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Unbroken	            = {hash:3369119720,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Wayfarer	            = {hash:2757681677,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Dredgen		        = {hash:3798931976,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Enlightened	        = {hash:3387213440,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Chronicler	            = {hash:1754983323,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Rivensbane	            = {hash:2182090828,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Reckoner	            = {hash:1313291220,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Harbinger	            = {hash:3793754396,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Undying                = {hash:2707428411,apilocation:'profileRecords',   got:[],need:[],amountgot:0,amountneed:0};
    // Apparently with shadowkeep all collectibles moved to profiles... 

    //put clan name in headline
    $("#headerText").html(header + ': ' + clan.clanName);
    //reset membercounter
    $("#membercounter").html('').show();

    $.ajax({
        url: "https://www.bungie.net/Platform/GroupV2/" + clan.clanId + "/Members/",
        headers: {
            "X-API-KEY": bungieAPIkey
        },
        method: "GET"
    }).done(function (data) {
        if (!data.Response) {
            $("#claninfo").html("API down?");
            return
        }
        //check if it's a cross platform clan
        $.each(data.Response.results, function (index, value) {
            clan.memberPlatforms.add(consoleTypesNames[value.destinyUserInfo.membershipType]);
        });
        $("#headerText").append( '<span style="font-size: 0.5em"> on ' + Array.from(clan.memberPlatforms).join(', ') + '</span>');

        
        $.each(data.Response.results, function (index, value) {
            clan.memberIds.push(value.destinyUserInfo.membershipId);
            clan.retryCounter[value.destinyUserInfo.membershipId] = 0;
            clan.explicitConsoleType[value.destinyUserInfo.membershipId] = value.destinyUserInfo.membershipType;
            clan.consoleTypeInOrder[value.destinyUserInfo.membershipId] = 0;
            clan.memberName[value.destinyUserInfo.membershipId] = value.destinyUserInfo.displayName;
            //append platform to user if there are more than one platform
            if (clan.memberPlatforms.size > 1) clan.memberName[value.destinyUserInfo.membershipId] += ' ('+consoleTypesNames[value.destinyUserInfo.membershipType]+')';       
            
        });
        clan.memberCount = clan.memberIds.length;
        $.each(clan.memberIds, function (index, memberid) {
            checkForSpecialAchievements(memberid)
        })
    })
}

function checkForSpecialAchievements(memberid) {
    var useThisMembershipType = clan.explicitConsoleType[memberid] > 0 ? clan.explicitConsoleType[memberid] : consoleTypes[clan.consoleTypeInOrder[memberid]];

    $.ajax({
        url: "https://www.bungie.net/Platform/Destiny2/" + useThisMembershipType + "/Profile/" + memberid + "/?components=800,900",
        headers: {
            "X-API-KEY": bungieAPIkey
        },
        method: "GET",
        error: function (data) {
            //don't use type from memberlist
            clan.explicitConsoleType[memberid] = 0;

            //try different platform
            if (clan.consoleTypeInOrder[memberid] < consoleTypes.length) {
                clan.consoleTypeInOrder[memberid]++;
                checkForSpecialAchievements(memberid)
            } else {
                //one more round then stop trying
                clan.consoleTypeInOrder[memberid] = 0;
                clan.retryCounter[memberid]++;
                if (clan.retryCounter[memberid] >= retriesPerCharacter) {
                    clan.unresolvedMemberNames.push(clan.memberName[memberid]);
                    return
                }
                checkForSpecialAchievements(memberid)
            }
        }
    }).done(function (data) {
        if (data.ErrorCode > 1 || !data.Response || typeof data.Response.profileCollectibles.data === "undefined") {
            clan.retryCounter[memberid]++;
            if (clan.retryCounter[memberid] >= retriesPerCharacter) {
                clan.unresolvedMemberNames.push(clan.memberName[memberid]);
                return
            }
            checkForSpecialAchievements(memberid)
        } else {

            clan.membersFetched = clan.membersFetched + 1;

            $.each(clan.membersWith, function (weapon, weapondata) {
                
                if (weapondata.apilocation == 'profileRecords') {
                                          
                    if (typeof data.Response.profileRecords.data.records[weapondata.hash] !== "undefined" && data.Response.profileRecords.data.records[weapondata.hash].state === 67) {
                        weapondata.amountgot = weapondata.amountgot + 1;
                        weapondata.got.push(clan.memberName[memberid]);
                    } else {
                        weapondata.amountneed = weapondata.amountneed + 1;
                        weapondata.need.push(clan.memberName[memberid]);
                        
                        //additional output to catch changed hashes
                        if (typeof data.Response.profileRecords.data.records[weapondata.hash] === "undefined"){
                            clan.SystemNotices.add('please check hash and location for ' +weapon+' ('+weapondata.hash+' in '+weapondata.apilocation+')');
                        } 
                    }
                }
                
                if (weapondata.apilocation == 'profileCollectibles') {
                                          
                    if (typeof data.Response.profileCollectibles.data.collectibles[weapondata.hash] !== "undefined" && data.Response.profileCollectibles.data.collectibles[weapondata.hash].state % 2 === 0) {
                        weapondata.amountgot = weapondata.amountgot + 1;
                        weapondata.got.push(clan.memberName[memberid]);
                    } else {
                        weapondata.amountneed = weapondata.amountneed + 1;
                        weapondata.need.push(clan.memberName[memberid]);
                        
                        //additional output to catch changed hashes
                        if (typeof data.Response.profileCollectibles.data.collectibles[weapondata.hash] === "undefined"){
                            clan.SystemNotices.add('please check hash and location for ' +weapon+' ('+weapondata.hash+' in '+weapondata.apilocation+')');
                        } 
                    }
                }

                if (weapondata.apilocation == 'characterCollectibles') {
                    tmpItemWasNotFound = true;
                    $.each(data.Response.characterCollectibles.data, function (index, value) {
                        if (typeof value.collectibles[weapondata.hash] !== "undefined" && value.collectibles[weapondata.hash].state % 2 === 0) {
                            weapondata.amountgot = weapondata.amountgot + 1;
                            weapondata.got.push(clan.memberName[memberid]);
                            tmpItemWasNotFound = false;
                            return false
                        }else {
                            //additional output to catch changed hashes
                            if (typeof value.collectibles[weapondata.hash] === "undefined"){
                                clan.SystemNotices.add('please check hash and location for ' +weapon+' ('+weapondata.hash+' in '+weapondata.apilocation+')');
                            } 
                        }
                    });
                    if (tmpItemWasNotFound) {
                        weapondata.amountneed = weapondata.amountneed + 1;
                        weapondata.need.push(clan.memberName[memberid]);
                    }
                }

                clan.membersWith[weapon] = weapondata;

            });


            outputClanData(clan)
        }
    });
    return
}

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()])) ;
    return obj
}

function outputClanData(clanobject) {
    $('.table > tbody').show();
    $.each(clanobject.membersWith, function (weapon, weapondata) {
        if (weapondata.amountgot == clanobject.memberCount) {
            $("#" + weapon).html(weapondata.amountgot).attr('data-content', 'Nobody! <br> Everyone in the clan has gotten this!');
            $("#" + weapon).css('background-color', 'goldenrod');
        } else {
            if (clan.memberPlatforms.size > 1) {
                var popoverhtml = '';
                var membersByPlatform = {};
                //build array for each platform with corresponding membernames
                $.each(consoleTypesNames, function (platformid, platformname) {
                    $.each(weapondata.need, function (index, membername) {
                        if (membername.endsWith(' (' + platformname + ')')) {
                            if (typeof membersByPlatform[platformname] === 'undefined') membersByPlatform[platformname] = [];
                            membersByPlatform[platformname].push(membername.slice(0, membername.length - platformname.length - 3));
                        }
                    });
                });

                //build html
                $.each(membersByPlatform, function (platformname, membernames) {
                    popoverhtml += ' <span class="platform-item">' + platformname + '</span><br> ' + membernames.sort(function (a, b) {return a.toLowerCase().localeCompare(b.toLowerCase());}).join(", ") + '<hr class="style-two">';
                });
                //remove last <hr>
                popoverhtml = popoverhtml.slice(0, popoverhtml.length - 4);

                $("#" + weapon).html(weapondata.amountgot).attr('data-content', popoverhtml);
            } else {
                //it's only a single platform clan, making things way easier =)
                $("#" + weapon).html(weapondata.amountgot).attr('data-content', weapondata.need.sort(function (a, b) {return a.toLowerCase().localeCompare(b.toLowerCase());}).join(", "));
            }

            $("#" + weapon).css('background-color', '');
        }
    });

    $("#membercounter").html(loadingCircle[loadingCircleIndex++ % loadingCircle.length] + ' ' + clanobject.membersFetched + "/" + clanobject.memberCount);
    return
};


function searchButtonPressed() {
    var clanName = $('input#ClanLookupInput').val();
    reloadPage('clanname', clanName);
}

// Lookup via enter clicked
// NOTE: This function could be used later for provided autocomplete results
function keypressInSearchbox(event) {
    var key = event.keyCode;

    if (key === 13) { // Enter key
        var clanName = $('input#ClanLookupInput').val();
        reloadPage('clanname', clanName);
    }
}


//reloads page with new parameter, discards all present parameter
function reloadPage(newParameter, newValue) {
    location.href = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?' + newParameter + '=' + newValue;
}

$(document).ready(function () {
    $(function () {
        $('[data-toggle=popover]:not([data-popover-content])').popover();
        $('[data-toggle=popover][data-popover-content]').popover({
            html: true,
            content: function () {
                var content = $(this).attr("data-popover-content");
                return $(content).children(".popover-body").html();
            },
            title: function () {
                var title = $(this).attr("data-popover-content");
                return $(title).children(".popover-heading").html();
            }
        });
    });

    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr:not(.alwaysthere)').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
        ;
    });

});


$(document).ajaxStop(function () {
    if (typeof clan.unresolvedMemberNames !== 'undefined') {
        if (clan.unresolvedMemberNames.length > 0) {
            $("#membercounter").html(clan.membersFetched + "/" + clan.memberCount + '!').prop("title", "unable to fetch data from " + clan.unresolvedMemberNames.join(", "));
        } else {
            $("#membercounter").hide();
        }
    }
    
    if (typeof clan.SystemNotices !== 'undefined') {
        if (clan.SystemNotices.size > 0) {
            console.log(clan.SystemNotices);
        } 
    }
    
});
