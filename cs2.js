var bungieAPIkey = "0a11942f318647978979f13ad8aa53ee";
    var clan = {};
        clan.memberIds = [];
        clan.memberCount = 0;
        clan.membersFetched = 0;
        clan.memberName = {};
        clan.retryCounter = {};
        clan.unresolvedMemberNames = [];
        clan.membersWithLunasHowl = 0;
        clan.membersWithNotForgotten = 0;
        clan.membersWithMountaintop = 0;
        clan.membersWithRedrixsBroadsword = 0;
        
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
            clan.membersWithLunasHowl = clan.membersWithLunasHowl + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[3260604718].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithNotForgotten = clan.membersWithNotForgotten + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[3260604717].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithRecluse = clan.membersWithRecluse + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[2335550020].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithMountaintop = clan.membersWithMountaintop + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[4047371119].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithRedrixsBroadsword = clan.membersWithRedrixsBroadsword + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1111219481].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            
            clan.membersWithRevoker = clan.membersWithRevoker + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[3066162258].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithLQ = clan.membersWithLQ + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[3810740723].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithOXY = clan.membersWithOXY + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[543982652].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithWEN = clan.membersWithWEN + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[3830703103].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithBN = clan.membersWithBN + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1666039008].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithDEL = clan.membersWithDEL + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1639266456].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithOneKay = clan.membersWithOneKay + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[199171385].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithAN = clan.membersWithAN + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[2220014607].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithMalf = clan.membersWithMalf + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1660030045].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithHush = clan.membersWithHush + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1670904512].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithTAR = clan.membersWithTAR + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[2329697053].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithAOT = clan.membersWithAOT + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1903459810].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithTH = clan.membersWithTH + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[4009683574].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithTR = clan.membersWithTR + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1763840761].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithTLW = clan.membersWithTLW + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[3074058273].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithIB = clan.membersWithIB + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[24541428].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithOP = clan.membersWithOP + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[2500286745].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            clan.membersWithScrap = clan.membersWithScrap + (jQuery.inArray(data.Response.profileCollectibles.data.collectibles[1840126886].state, aquiredCollectibleStateValues) !== -1 ? 1 : 0);
            
            $.each(data.Response.characterCollectibles.data, function(index, value) {
                if ((jQuery.inArray(value.collectibles[1469913804].state, aquiredCollectibleStateValues) !== -1)) {
                    clan.membersWithLWS = clan.membersWithLWS + 1;
                    return false
                }
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
    $("#LunasHowl").html(clanobject.membersWithLunasHowl);
    $("#NotForgotten").html(clanobject.membersWithNotForgotten);
    $("#Mountaintop").html(clanobject.membersWithMountaintop);
    $("#RedrixsBroadsword").html(clanobject.membersWithRedrixsBroadsword);
    $("#membercounter").html(clanobject.membersFetched + "/" + clanobject.memberCount);
    return
};

$(document).ready(function () {

    $('.star').on('click', function () {
      $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
    });

 });