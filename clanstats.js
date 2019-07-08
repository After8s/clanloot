var bungieAPIkey = "0a11942f318647978979f13ad8aa53ee";
    var clan = {};
        clan.memberIds = [];
        clan.memberCount = 0;
        clan.membersFetched = 0;
        clan.memberName = {};
        clan.retryCounter = {};
        clan.unresolvedMemberNames = [];
        clan.membersWith = {};
        clan.membersWith.LunasHowl           = {hash:3260604718,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.NotForgotten        = {hash:3260604717,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Mountaintop         = {hash:4047371119,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.RedrixsBroadsword   = {hash:1111219481,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Recluse             = {hash:2335550020,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.LoadedQuestion      = {hash:3810740723,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Revoker             = {hash:3066162258,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Hush                = {hash:1670904512,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Wendigo             = {hash:3830703103,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Breakneck           = {hash:1666039008,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Malfeasance         = {hash:1660030045,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Oxygen              = {hash:543982652, apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.TheLastWord         = {hash:3074058273,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Truth               = {hash:1763840761,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Thorn               = {hash:4009683574,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Delirium            = {hash:1639266456,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.IzanagisBurden      = {hash:24541428,  apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Tarrabah            = {hash:2329697053,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.OneThousandVoices   = {hash:199171385, apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Anarchy             = {hash:2220014607,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.OutbreakPerfected   = {hash:2500286745,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.Whisper             = {hash:3875807583,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.RedrixsClaymore     = {hash:4274523516,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.WishEnder           = {hash:1660030044,apilocation:'profileCollectibles',  got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.DutyBound           = {hash:1333654061,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.SiliconNeuroma      = {hash:1152758802,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.BrayTechOsprey      = {hash:1534387877,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.TheLongGoodbye      = {hash:1186314105,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.MindbendersAmbition = {hash:1074861258,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.MilitiasBirthright  = {hash:1602518767,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.WardensLaw          = {hash:1279318101,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.HorrorsLeast        = {hash:1099984904,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};
        clan.membersWith.DFA                 = {hash:1279318110,apilocation:'characterCollectibles',got:[],need:[],amountgot:0,amountneed:0};

     
$(document).ready(function() {
    $.ajax({
        url: "https://www.bungie.net/Platform/GroupV2/1801684/Members/",
        headers: {
            "X-API-KEY": bungieAPIkey
        },
        method: "GET"
    }).done(function(data) {
        if (!data.Response) {
            $("#claninfo").html("API down?");
            return
        }
        $.each(data.Response.results, function(index, value) {
            clan.memberIds.push(value.destinyUserInfo.membershipId);
            clan.retryCounter[value.destinyUserInfo.membershipId] = 0;
            clan.memberName[value.destinyUserInfo.membershipId] = value.destinyUserInfo.displayName
        });
        clan.memberCount = clan.memberIds.length;
        $.each(clan.memberIds, function(index, memberid) {
            getAccountData(memberid);
            checkForSpecialAchievements(memberid)
        })
    })
});
$(document).ajaxStop(function() {
    $(".sk-folding-cube").hide();
    if (clan.unresolvedMemberNames.length > 0) $(".cubelegend").append("<br><small>(unable to fetch " + clan.unresolvedMemberNames.join(", ") + ")</small>")
});

function getAccountData(memberid) {
    clan.retryCounter[memberid] = clan.retryCounter[memberid] + 1;
    if (clan.retryCounter[memberid] > 4) {
        clan.unresolvedMemberNames.push(clan.memberName[memberid]);
        return
    }
    $.ajax({
        url: "https://www.bungie.net/Platform/Destiny2/2/Account/" + memberid + "/Character/0/Stats/",
        headers: {
            "X-API-KEY": bungieAPIkey
        },
        data: {
            groups: "1,3",
            modes: "4,5,7,10,12,15,19,25,31,32,37,38,39,41,42,43,44,45,48,49,50,51,52,53,5,4,55,56,57,59,60,61,62,64,65,68,69,70,71,72,73,74"
        },
        method: "GET"
    }).done(function(data) {
        if (data.ErrorCode > 1 || !data.Response) getAccountData(memberid);
        else {
            clan.membersFetched = clan.membersFetched +
                1;
            outputClanData(clan)
        }
    });
    return
}

function checkForSpecialAchievements(memberid) {
    var aquiredCollectibleStateValues = [0, 8, 16, 64, 80];
    $.ajax({
        url: "https://www.bungie.net/Platform/Destiny2/2/Profile/" + memberid + "/?components=800,900",
        headers: {
            "X-API-KEY": bungieAPIkey
        },
        method: "GET"
    }).done(function(data) {
        if (data.ErrorCode > 1 || !data.Response || typeof data.Response.profileCollectibles.data === "undefined") {
            clan.retryCounter[memberid]++;
            if (clan.retryCounter[memberid] > 4) {
                clan.unresolvedMemberNames.push(clan.memberName[memberid]);
                return
            }
            checkForSpecialAchievements(memberid)
        } else {
              
            $.each(clan.membersWith, function(weapon, weapondata) {
                
                if (weapondata.apilocation == 'profileCollectibles') {
                    if (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[weapondata.hash].state, aquiredCollectibleStateValues) !== -1) {
                        weapondata.amountgot = weapondata.amountgot + 1;
                        weapondata.got.push(clan.memberName[memberid]);
                    } else {
                        weapondata.amountneed = weapondata.amountneed + 1;
                        weapondata.need.push(clan.memberName[memberid]);
                    }
                }
                
                if (weapondata.apilocation == 'characterCollectibles') {
                    tmpItemWasNotFound = true;
                    $.each(data.Response.characterCollectibles.data, function(index, value) {
                        if ((jQuery.inArray(value.collectibles[weapondata.hash].state, aquiredCollectibleStateValues) !== -1)) {
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
    while (arr.length && (obj = obj[arr.shift()]));
    return obj
}

function outputClanData(clanobject) {
    
    $.each(clanobject.membersWith, function(weapon, weapondata) {
        $("#"+weapon).html(weapondata.amountgot).prop('title', weapondata.got.sort().join(", "));
    }); 
  
    $("#membercounter").html(clanobject.membersFetched + "/" + clanobject.memberCount);
    return
};

$(document).ready(function () {

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr:not(.alwaysthere)').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      };
    });

 });