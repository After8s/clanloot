var bungieAPIkey = "0a11942f318647978979f13ad8aa53ee";
var clan = {};
var header = 'Clan Loot';
var version = 'v2.5.1';
var A8sClanId = 1801684;


$(document).ready(function () {
    lookupClan('After8s');
});

function lookupClan(clanName) {

    $('#lookupError').hide();

    $.ajax({
        url: 'https://www.bungie.net/Platform/GroupV2/Name/' + clanName + '/1/',
        headers: {
            'X-API-KEY': bungieAPIkey
        },
        method: 'GET',
        success: function (data) {
            if (typeof data.Response.detail.groupId !== "undefined"){
                getClanData(data.Response.detail.groupId, data.Response.detail.name + ' [' +  data.Response.detail.clanInfo.clanCallsign+ ']');
            } else {
                $('#lookupError').show();
            }
        },
        error: function (data) {
            $('#lookupError').show();
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
    clan.retryCounter = {};
    clan.unresolvedMemberNames = [];
    clan.membersWith = {};

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
    clan.membersWith.Antediluvian           = {hash:1469913806,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.BrayTechOsprey         = {hash:1534387877,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.CleansingKnife         = {hash:1469913804,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.DFA                    = {hash:1279318110,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.DriftApart             = {hash:3163873691,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.DutyBound              = {hash:1333654061,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Ermine                 = {hash:3163873693,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.FurtiveShell           = {hash:3360537486,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.ImpactVelocity         = {hash:3036030067,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Ludomaniacal           = {hash:923458194, apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.PallasGalliot          = {hash:3163873689,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.SiliconNeuroma         = {hash:1152758802,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.SilverTercel           = {hash:1469913807,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.StarlightShell         = {hash:3360537487,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.TiltFuse               = {hash:3036030066,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Trichromatica          = {hash:1718922261,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.UniversalWavefunction  = {hash:2448009818,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Voidstreak             = {hash:1966171335,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.Warminded              = {hash:1716561040,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};
    clan.membersWith.WishMaker              = {hash:3360537485,apilocation:'characterCollectibles', got:[],need:[],amountgot:0,amountneed:0};

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
        $.each(data.Response.results, function (index, value) {
            clan.memberIds.push(value.destinyUserInfo.membershipId);
            clan.retryCounter[value.destinyUserInfo.membershipId] = 0;
            clan.memberName[value.destinyUserInfo.membershipId] = value.destinyUserInfo.displayName
        });
        clan.memberCount = clan.memberIds.length;
        $.each(clan.memberIds, function (index, memberid) {
            getAccountData(memberid);
            checkForSpecialAchievements(memberid)
        })
    })
}

function getAccountData(memberid) {

    clan.retryCounter[memberid] = clan.retryCounter[memberid] + 1;
    if (clan.retryCounter[memberid] > 4) {
        clan.unresolvedMemberNames.push(clan.memberName[memberid]);
        return
    }

//debugging, simulate incomplete fetching
//    if (memberid == '4611686018435274157' || memberid == '4611686018453612628') {
//        getAccountData(memberid);
//        return;
//    }

    $.ajax({
        url: "https://www.bungie.net/Platform/Destiny2/2/Account/" + memberid + "/Character/0/Stats/",
        headers: {
            "X-API-KEY": bungieAPIkey
        },
        data: {
            groups: "1,2,3",
            modes: "4,5,7,10,12,15,19,25,31,32,37,38,39,41,42,43,44,45,48,49,50,51,52,53,54,58,59,60,61,62,64,65,68,69,70,71,72,73,74,75,76,77"
        },
        method: "GET"
    }).done(function (data) {
        if (data.ErrorCode > 1 || !data.Response) {
            getAccountData(memberid);
        } else {
            clan.membersFetched = clan.membersFetched + 1;
            outputClanData(clan)
        }
    });
    return
}

function checkForSpecialAchievements(memberid) {
    $.ajax({
        url: "https://www.bungie.net/Platform/Destiny2/2/Profile/" + memberid + "/?components=800,900",
        headers: {
            "X-API-KEY": bungieAPIkey
        },
        method: "GET"
    }).done(function (data) {
        if (data.ErrorCode > 1 || !data.Response || typeof data.Response.profileCollectibles.data === "undefined") {
            clan.retryCounter[memberid]++;
            if (clan.retryCounter[memberid] > 4) {
                clan.unresolvedMemberNames.push(clan.memberName[memberid]);
                return
            }
            checkForSpecialAchievements(memberid)
        } else {

            $.each(clan.membersWith, function (weapon, weapondata) {

                if (weapondata.apilocation == 'profileCollectibles') {
                    if (data.Response.profileCollectibles.data.collectibles[weapondata.hash].state % 2 === 0) {
                        weapondata.amountgot = weapondata.amountgot + 1;
                        weapondata.got.push(clan.memberName[memberid]);
                    } else {
                        weapondata.amountneed = weapondata.amountneed + 1;
                        weapondata.need.push(clan.memberName[memberid]);
                    }
                }

                if (weapondata.apilocation == 'characterCollectibles') {
                    tmpItemWasNotFound = true;
                    $.each(data.Response.characterCollectibles.data, function (index, value) {
                        if (value.collectibles[weapondata.hash].state % 2 === 0) {
                            weapondata.amountgot = weapondata.amountgot + 1;
                            weapondata.got.push(clan.memberName[memberid]);
                            tmpItemWasNotFound = false;
                            return false
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

    $.each(clanobject.membersWith, function (weapon, weapondata) {
        if (weapondata.amountgot == clanobject.memberCount) {
            $("#" + weapon).html(weapondata.amountgot).attr('data-content', 'Nobody! <br> Everyone in the clan has gotten this!');
            $("#" + weapon).css('background-color', 'goldenrod');
        } else {
            $("#" + weapon).html(weapondata.amountgot).attr('data-content', weapondata.need.sort().join(", "));
            $("#" + weapon).css('background-color', '');
        }
    });

    $("#membercounter").html(clanobject.membersFetched + "/" + clanobject.memberCount);
    return
};

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
    if   ( typeof clan.unresolvedMemberNames !== 'undefined') {
        if (clan.unresolvedMemberNames.length > 0) {
            $('#membercounter').prop("title", "unable to fetch data from " + clan.unresolvedMemberNames.join(", ")).append("!");
        } else $("#membercounter").hide();
    }

});

 
